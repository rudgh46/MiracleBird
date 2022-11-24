package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.entity.Price;

import java.util.List;

public interface PriceDao {
    List<Price> getPriceAllByLandmark(Long landmarkInfoIdx) throws Exception;
    void savePrice(Price price) throws Exception;
}