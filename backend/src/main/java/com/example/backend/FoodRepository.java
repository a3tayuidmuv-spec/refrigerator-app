package com.example.backend;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food, String> {

    Optional<Food> findByName(String name);
}