package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.*;
import com.ssafy.miraclebird.dto.LandmarkDto;
import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.dto.PriceDto;
import com.ssafy.miraclebird.entity.*;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PriceServiceImpl implements PriceService {

    private final PriceDao priceDao;
    private final UserDao userDao;
    private final LandmarkDao landmarkDao;

    @Autowired
    public PriceServiceImpl(PriceDao priceDao, UserDao userDao, LandmarkDao landmarkDao) {
        this.priceDao = priceDao;
        this.userDao = userDao;
        this.landmarkDao = landmarkDao;
    }

    @Override
    @Transactional
    public List<PriceDto> getPriceAllByLandmark(Long landmarkIdx) throws Exception {
        try {
            long landmarkInfoIdx = landmarkDao.getLandmark(landmarkIdx).getLandmarkInfo().getLandmarkInfoIdx();
            List<Landmark> landmarkList = landmarkDao.getLandmarkAllByLandmarkInfoIdx(landmarkInfoIdx);
            List<Price> priceList = new ArrayList<>();

            for (Landmark landmark : landmarkList) {
                List<Price> list = priceDao.getPriceAllByLandmark(landmark.getLandmarkIdx());
                priceList.addAll(list);

            }

            List<PriceDto> priceDtoList = priceList.stream().map(entity -> PriceDto.of(entity)).collect(Collectors.toList());

            return priceDtoList;
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public void createPrice(PriceDto priceDto) throws Exception {
        try {
            Price priceEntity = new Price();
            priceEntity.setGasPrice(priceDto.getGasPrice());
            priceEntity.setHash(priceDto.getHash());
            priceEntity.setSellDate(LocalDateTime.now());
            priceEntity.setSellPrice(priceDto.getSellPrice());
            priceEntity.setUserFrom(priceDto.getUserFrom());
            priceEntity.setUserTo(priceDto.getUserTo());
            priceEntity.setLandmark(landmarkDao.getLandmark(priceDto.getLandmarkIdx()));
            priceDao.savePrice(priceEntity);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }
}