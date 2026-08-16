package com.example.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@CrossOrigin(
        origins = "http://localhost:5174",
        allowCredentials = "true"
)
@RequestMapping("/foods")
public class FoodController {

    private final FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping
    public List<FoodResponse> getFoods() {
        return foodService.findAll()
               .stream()
                .map(food -> new FoodResponse(
                        food.getName(),
                        food.getQuantity()
                ))
                .toList();
    }

    public record FoodResponse(
            String name,
            Integer quantity
    ) {
    }

    @GetMapping("/{name}")
    public Food getFood(@PathVariable String name) {
        return foodService.findByName(name);
    }

    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody Food food) {

        System.out.println("受信した食品名：" + food.getName());
        System.out.println("受信したカテゴリ：" + food.getCategory());
        System.out.println("受信した数量：" + food.getQuantity());
        System.out.println("受信した賞味期限：" + food.getExpirationDate());

        Food savedFood = foodService.save(food);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedFood);
    }

    @PutMapping("/{name}")
    public Food updateFood(@PathVariable String name, @RequestBody Food food) {
        food.setName(name);
        return foodService.save(food);
    }

    @DeleteMapping
    public void deleteFood(@RequestParam String name) {
        foodService.deleteByName(name);
    }
}