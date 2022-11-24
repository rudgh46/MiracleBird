package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.LandmarkDto;
import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.dto.PriceDto;

import java.util.List;

public interface PriceService {
    List<PriceDto> getPriceAllByLandmark(Long landmarkIdx) throws Exception;
    void createPrice(PriceDto priceDto) throws Exception;

}