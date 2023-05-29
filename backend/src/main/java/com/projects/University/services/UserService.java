package com.projects.University.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.University.dto.RoleDTO;
import com.projects.University.dto.UserDTO;
import com.projects.University.dto.UserInsertDTO;
import com.projects.University.dto.UserUpdateDTO;
import com.projects.University.entities.Appointment;
import com.projects.University.entities.Role;
import com.projects.University.entities.User;
import com.projects.University.repositories.AppointmentRepository;
import com.projects.University.repositories.RoleRepository;
import com.projects.University.repositories.UserRepository;
import com.projects.University.services.exceptions.DataBaseException;
import com.projects.University.services.exceptions.ResourceNotFoundException;

@Service
public class UserService implements UserDetailsService {

	private static Logger logger = org.slf4j.LoggerFactory.getLogger(UserService.class); 

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository repository;

	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private AppointmentRepository appointmentRepository;

	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(Pageable pageable) {
		Page<User> list = repository.findAll(pageable);
		return list.map(x -> new UserDTO(x));
	}

	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = repository.findById(id);
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new UserDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public UserDTO findByEmail(String email) {
		Optional<User> obj = Optional.ofNullable(repository.findByEmail(email));
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		User entity = new User();
		copyDtoToEntity(dto, entity);

		entity.setPassword(passwordEncoder.encode(dto.getPassword()));

		entity = repository.save(entity);
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO update(Long id, UserUpdateDTO dto) {
		try {
			User entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new UserDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}

		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity Violation");
		}
	}

	private void copyDtoToEntity(UserDTO dto, User entity) {

		entity.setName(dto.getName());
		entity.setEmail(dto.getEmail());
		entity.setImgUrl(dto.getImgUrl());

		entity.getRoles().clear();

		for (RoleDTO rolDto : dto.getRoles()) {
			Role role = roleRepository.getOne(rolDto.getId());
			entity.getRoles().add(role);
		}
		
		for (Long clientAppointmentId : dto.getClientAppointmentsId()) {
			Appointment appointment = appointmentRepository.getOne(clientAppointmentId);
			entity.getClientAppointments().add(appointment);
		}
		
		for (Long barberAppointmentId : dto.getBarberAppointmentsId()) {
			Appointment appointment = appointmentRepository.getOne(barberAppointmentId);
			entity.getBarberAppointments().add(appointment);
		}

	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = repository.findByEmail(username);

		if (user == null) {
			logger.error("User not found: " + username);
			throw new UsernameNotFoundException("Email not found");
		}
		logger.info("User found: " + username);
		return user;
	}
	
	@Transactional(readOnly = true)
	public List<LocalDateTime> findReservedDatesForBarberOnDate(Long barberId, LocalDateTime startTime, LocalDateTime endTime) {
		User user = repository.getOne(barberId);
		List<LocalDateTime> list = appointmentRepository.findReservedDatesByBarberAndDate(user, startTime, endTime);
		return list;
	}
	
}
