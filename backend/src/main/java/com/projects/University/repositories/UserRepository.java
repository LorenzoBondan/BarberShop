package com.projects.University.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projects.University.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{

	// METODO QUE BUSCA NO BANCO UM USUARIO POR EMAIL
	User findByEmail(String email);
	
	@Query(nativeQuery = true, value = "SELECT * FROM tb_user WHERE id IN (SELECT user_id FROM tb_user_role WHERE role_id = 2)")
	Page<User> findBarbers(Pageable pageable);
}
