package com.example.backend;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class FoodService {

    private final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    // 食品一覧を取得
    public List<Food> findAll() {
        return foodRepository.findAll();
    }

    // 食品を名前で取得
    public Food findByName(String name) {
        return foodRepository.findByName(name)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "対象の食材がありません"
                ));
    }

    // 食品を登録
    public Food save(Food food) {
        return foodRepository.save(food);
    }

    // 食品を削除
    public void deleteByName(String name) {
        foodRepository.deleteById(name);
    }
}