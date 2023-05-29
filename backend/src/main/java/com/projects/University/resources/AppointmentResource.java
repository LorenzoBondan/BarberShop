package com.projects.University.resources;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projects.University.dto.AppointmentDTO;
import com.projects.University.services.AppointmentService;

@RestController
@RequestMapping(value = "/appointments")
public class AppointmentResource {

	@Autowired
	private AppointmentService service;
	
	@GetMapping
	public ResponseEntity<Page<AppointmentDTO>> findAll(Pageable pageable) {
		Page<AppointmentDTO> list = service.findAllPaged(pageable);	
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}") 
	public ResponseEntity<AppointmentDTO> findById(@PathVariable Long id) {
		AppointmentDTO dto = service.findById(id);	
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<AppointmentDTO> insert (@Valid @RequestBody AppointmentDTO dto) {
		AppointmentDTO newDto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(newDto.getId()).toUri();
		return ResponseEntity.created(uri).body(newDto);	
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<AppointmentDTO> delete(@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
