package com.ssafy.miraclebird.repository;

import com.ssafy.miraclebird.entity.Comment;
import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.entity.Price;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PriceRepository extends JpaRepository<Price,Long>{
    List<Price> findAllByLandmark_landmarkIdx(Long landmarkIdx);

}
