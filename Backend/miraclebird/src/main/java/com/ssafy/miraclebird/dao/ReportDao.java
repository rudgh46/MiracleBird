package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Challenge;
import com.ssafy.miraclebird.entity.Report;

import java.util.List;

public interface ReportDao {
    List<Report> getReportALL();
    Report getReportById(long reportIdx);
    void saveReport(Report report) throws Exception;
    void deleteReport(long reportIdx) throws Exception;
}
