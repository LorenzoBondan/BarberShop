package com.projects.University.repositories;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projects.University.entities.Appointment;
import com.projects.University.entities.User;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Long>{

	List<Appointment> findByDateTime(LocalDateTime dateTime);
	
    @Query("SELECT DISTINCT DATE(a.dateTime) FROM Appointment a WHERE a.barber = :barber AND DATE(a.dateTime) = :date")
    List<LocalDate> findReservedDatesByBarberAndDate(@Param("barber") User barber, @Param("date") LocalDate date);
}
