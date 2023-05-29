package com.projects.University.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.University.entities.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Long>{

	List<Appointment> findByDateTime(LocalDateTime dateTime);
}