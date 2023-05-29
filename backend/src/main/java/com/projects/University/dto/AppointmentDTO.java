package com.projects.University.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import javax.validation.constraints.NotBlank;

import com.projects.University.entities.Appointment;

public class AppointmentDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	@NotBlank(message = "Campo obrigatório")
	private LocalDateTime dateTime;
	@NotBlank(message = "Campo obrigatório")
	private UserDTO barber;
	@NotBlank(message = "Campo obrigatório")
	private UserDTO client;
	
	public AppointmentDTO() {}
	
	public AppointmentDTO(Long id, LocalDateTime dateTime, UserDTO barber, UserDTO client) {
		super();
		this.id = id;
		this.dateTime = dateTime;
		this.barber = barber;
		this.client = client;
	}

	public AppointmentDTO(Appointment entity) {
		super();
		this.id = entity.getId();
		this.dateTime = entity.getDateTime();
		this.barber = new UserDTO(entity.getBarber());
		this.client = new UserDTO(entity.getClient());
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDateTime getDateTime() {
		return dateTime;
	}

	public void setDateTime(LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}

	public UserDTO getBarber() {
		return barber;
	}

	public void setBarber(UserDTO barber) {
		this.barber = barber;
	}

	public UserDTO getClient() {
		return client;
	}

	public void setClient(UserDTO client) {
		this.client = client;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AppointmentDTO other = (AppointmentDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	

}
