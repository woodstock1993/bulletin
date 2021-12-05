//package com.sparta.week03.testdata;
//
//import com.sparta.week03.domain.Memo;
//import com.sparta.week03.repository.MemoRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.boot.ApplicationArguments;
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.stereotype.Component;
//
//@Component
//@RequiredArgsConstructor
//public class TestDataRunner implements ApplicationRunner {
//
//    private final MemoRepository memoRepository;
//
//    @Override
//    public void run(ApplicationArguments args) throws Exception {
//        // 테스트 memo 생성
//        for(int i = 0; i < 200; i++) {
//            Memo memo = new Memo("제목12345", "내용12345");
//            memoRepository.save(memo);
//        }
//    }
//}