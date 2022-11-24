package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.*;
import com.ssafy.miraclebird.dto.MynftDto;
import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.entity.Comment;
import com.ssafy.miraclebird.entity.Landmark;
import com.ssafy.miraclebird.entity.Mynft;
import com.ssafy.miraclebird.entity.Wallet;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MynftServiceImpl implements MynftService {

    private final MynftDao mynftDao;
    private final LandmarkDao landmarkDao;
    private final WalletDao walletDao;
    private final UserDao userDao;

    @Autowired
    public MynftServiceImpl(MynftDao mynftDao, LandmarkDao landmarkDao, WalletDao walletDao, UserDao userDao) {
        this.mynftDao = mynftDao;
        this.landmarkDao = landmarkDao;
        this.walletDao = walletDao;
        this.userDao = userDao;
    }

    @Override
    @Transactional
    public List<MynftDto> getMynft(Long userIdx) throws Exception{
        try {
            List<Mynft> mynftList = mynftDao.getMynftAll(userIdx);
//            MynftDto mynftDto = MynftDto.of(mynftEntity);
            List<MynftDto> MynftDtoList = mynftList.stream().map(entity -> MynftDto.of(entity)).collect(Collectors.toList());

            return MynftDtoList;
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public void createMynft(MynftDto mynftDto, Long userIdx) throws Exception {
        try {
            Mynft mynftEntity = new Mynft();
            Landmark landmarkEntity = landmarkDao.getLandmark(mynftDto.getLandmarkIdx());
            Wallet walletEntity = walletDao.getWalletById(mynftDto.getWalletIdx());

            if(walletEntity.getUser().getUserIdx() == userIdx) {
                mynftEntity.setLandmark(landmarkEntity);
                mynftEntity.setWallet(walletEntity);
                mynftDao.saveMynft(mynftEntity);
            }
            else throw new Exception();
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public void deleteMynft(Long mynftIdx, Long userIdx) throws Exception {
        Mynft mynftEntity = mynftDao.getMynft(mynftIdx);
        Wallet walletEntity = mynftEntity.getWallet();

        if (walletEntity.getUser().getUserIdx() == userIdx) {
            mynftDao.deleteMynft(mynftIdx);
        }
        else {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public void updateMynft(Long landmarkIdx, Long userIdx) throws Exception {
        try {
            Mynft mynftEntity = mynftDao.getMynftByLandmark(landmarkIdx);
            User userEntity = userDao.getUserById(userIdx);
            Wallet walletEntity = userEntity.getWallet();

            mynftEntity.setWallet(walletEntity);
            mynftDao.saveMynft(mynftEntity);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }
}