package com.ssafy.miraclebird.controller;

import com.ssafy.miraclebird.dto.ReportDto;
import com.ssafy.miraclebird.securityOauth.config.security.token.CurrentUser;
import com.ssafy.miraclebird.securityOauth.config.security.token.UserPrincipal;
import com.ssafy.miraclebird.service.ReportService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/report")
@Api("챌린지 인증샷 신고 관련 REST V1")
public class ReportController {
    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @ApiOperation(value = "모든 Report의 정보를 반환한다.", response = ReportDto.class)
    @GetMapping("/")
    public ResponseEntity<List<ReportDto>> getReportALL() throws Exception {
        try{
            List<ReportDto> result = reportService.getReportALL();

            return ResponseEntity.status(HttpStatus.OK).body(result);
        }
            catch (Exception e) {
            throw new Exception();
        }
    }

    @ApiOperation(value = "특정 Report의 정보를 반환한다.", response = ReportDto.class)
    @GetMapping("/{report_idx}")
    public ResponseEntity<ReportDto> getReportById(@PathVariable("report_idx") long reportIdx) {
        ReportDto result = reportService.getReportById(reportIdx);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "특정 Report의 정보를 등록한다.", response = ReportDto.class)
    @PostMapping
    public ResponseEntity<String> createReport(@RequestBody ReportDto reportDto, @Parameter(description = "Accesstoken", required = true) @CurrentUser UserPrincipal userPrincipal) {
        try{
            long userIdx = userPrincipal.getId();
            reportDto.setUserIdx(userIdx);
            reportService.createReport(reportDto);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success",HttpStatus.OK);
    }

    @ApiOperation(value = "특정 Report의 정보를 삭제한다.", response = ReportDto.class)
    @DeleteMapping("/{report_idx}")
    public ResponseEntity<String> deleteReport(@PathVariable("report_idx") long reportIdx, @Parameter(description = "Accesstoken", required = true) @CurrentUser UserPrincipal userPrincipal) {
        String result;
        try{
            long userIdx = userPrincipal.getId();
            result = reportService.deleteReport(reportIdx, userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>(result,HttpStatus.OK);
    }
}
