package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.CommentDao;
import com.ssafy.miraclebird.dao.WalletDao;
import com.ssafy.miraclebird.dao.UserDao;
import com.ssafy.miraclebird.dto.WalletDto;
import com.ssafy.miraclebird.entity.Comment;
import com.ssafy.miraclebird.entity.Wallet;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WalletServiceImpl implements WalletService {

    private final WalletDao walletDao;
    private final UserDao userDao;
    private final CommentDao commentDao;

    @Autowired
    public WalletServiceImpl(WalletDao walletDao, UserDao userDao, CommentDao commentDao) {
        this.walletDao = walletDao;
        this.userDao = userDao;
        this.commentDao = commentDao;
    }

//    @Override
//    @Transactional
//    public List<WalletDto> getWalletAll() throws Exception {
//        try {
//            List<Wallet> walletList = walletDao.getWalletAll();
//            List<WalletDto> walletDtoList = walletList.stream().map(entity -> WalletDto.of(entity)).collect(Collectors.toList());
//
//            for (WalletDto walletDto : walletDtoList) {
//                User userEntity = userDao.getUserById(walletDto.getUserIdx());
//                walletDto.setUserRole(userEntity.getRole());
//            }
//
//            return walletDtoList;
//        }
//        catch (Exception e) {
//            throw new Exception();
//        }
//    }

    @Override
    @Transactional
    public WalletDto getWallet(Long userIdx) throws Exception{
        try {
            Wallet walletEntity = walletDao.getWallet(userIdx);
            WalletDto walletDto = WalletDto.of(walletEntity);

            return walletDto;
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public Wallet createWallet(WalletDto walletDto) throws Exception {
        try {
            Wallet walletEntity = new Wallet();
            User userEntity = userDao.getUserById(walletDto.getUserIdx());

            walletEntity.setWalletAddress(walletDto.getWalletAddress());
            walletEntity.setUser(userEntity);
            walletEntity.setEtherCoin(0);
            walletEntity.setMiraToken(0);
            walletDao.saveWallet(walletEntity);

            return walletEntity;
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

//    @Override
//    @Transactional
//    public void updateWallet(WalletDto walletDto) throws Exception {
//        Wallet walletEntity = walletDao.getWallet(walletDto.getWalletIdx());
//
//        if (walletEntity.getUser().getUserIdx() == userIdx) {
//            walletEntity.setTitle(walletDto.getTitle());
//            walletEntity.setContent(walletDto.getContent());
//            walletDao.saveWallet(walletEntity);
//        }
//        else {
//            throw new Exception();
//        }
//    }

    @Override
    @Transactional
    public void deleteWallet(Long walletIdx, Long userIdx) throws Exception {
        Wallet walletEntity = walletDao.getWalletById(walletIdx);

        if (walletEntity.getUser().getUserIdx() == userIdx) {
            walletDao.deleteWallet(walletIdx);
        }
        else {
            throw new Exception();
        }
    }
}