package com.projects.University.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.University.dto.AppointmentDTO;
import com.projects.University.entities.Appointment;
import com.projects.University.repositories.AppointmentRepository;
import com.projects.University.repositories.UserRepository;
import com.projects.University.services.exceptions.DataBaseException;
import com.projects.University.services.exceptions.ResourceNotFoundException;

@Service
public class AppointmentService {
	
	@Autowired
	private AppointmentRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Transactional(readOnly = true)
	public Page<AppointmentDTO> findAllPaged(Pageable pageable) {
		Page<Appointment> list = repository.findAll(pageable);
		return list.map(x -> new AppointmentDTO(x));
	}

	@Transactional(readOnly = true)
	public AppointmentDTO findById(Long id) {
		Optional<Appointment> obj = repository.findById(id);
		Appointment entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new AppointmentDTO(entity);
	}
	
	@Transactional
	public AppointmentDTO insert(AppointmentDTO dto) {
		
		Appointment entity = new Appointment();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new AppointmentDTO(entity);
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
	
	private void copyDtoToEntity(AppointmentDTO dto, Appointment entity) {
		entity.setDateTime(dto.getDateTime());
		entity.setBarber(userRepository.getOne(dto.getBarber().getId()));
		entity.setClient(userRepository.getOne(dto.getClient().getId()));
	}

}
