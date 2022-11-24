package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Landmark;
import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.entity.Price;
import com.ssafy.miraclebird.repository.LandmarkRepository;
import com.ssafy.miraclebird.repository.PostRepository;
import com.ssafy.miraclebird.repository.PriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PriceDaoImpl implements PriceDao {

    private final PriceRepository priceRepository;
    private final LandmarkRepository landmarkRepository;


    @Autowired
    public PriceDaoImpl(PriceRepository priceRepository, LandmarkRepository landmarkRepository) {
        this.priceRepository = priceRepository;
        this.landmarkRepository = landmarkRepository;
    }

    @Override
    public List<Price> getPriceAllByLandmark(Long landmarkIdx) throws Exception {
        List<Price> priceList = priceRepository.findAllByLandmark_landmarkIdx(landmarkIdx);

        return priceList;
    }

    @Override
    public void savePrice(Price price) throws Exception {
        try {
            priceRepository.save(price);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }
}
