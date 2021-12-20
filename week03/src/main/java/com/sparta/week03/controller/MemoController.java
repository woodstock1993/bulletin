package com.sparta.week03.controller;

import com.sparta.week03.domain.APIResponse;
import com.sparta.week03.domain.Memo;
import com.sparta.week03.domain.User;
import com.sparta.week03.repository.MemoRepository;
import com.sparta.week03.dto.MemoRequestDto;
import com.sparta.week03.security.UserDetailsImpl;
import com.sparta.week03.service.MemoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class MemoController {

    private final MemoRepository memoRepository;
    private final MemoService memoService;

    @GetMapping("/posts")
    private APIResponse<List<Memo>> gettingMemos() {
        List<Memo> allMemos = memoService.findAllMemos();
        return new APIResponse<>(allMemos.size(), allMemos);
    }

    @GetMapping("/posts/{field}")
    private APIResponse<List<Memo>> findMemosWithSorting(@PathVariable String field) {
        List<Memo> allMemos = memoService.findMemosWithSorting(field);
        return new APIResponse<>(allMemos.size(), allMemos);
    }

    @GetMapping("/paginationAndSort/{offset}/{pageSize}/{field}")
    private APIResponse<Page<Memo>> findMemosWithSorting(@PathVariable int offset, @PathVariable int pageSize, @PathVariable String field) {
        Page<Memo> memosWithPagination = memoService.findMemosWithPaginationAndSort(offset, pageSize, field);
        return new APIResponse<>(memosWithPagination.getSize(), memosWithPagination);
    }

    //로그인한 유저가 작성한 글을 보여주는 API
    @GetMapping("/api/user/memos")
    public List<Memo> getMemos(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long userId = userDetails.getUser().getId();
        return memoService.getMemos(userId);
    }

    @GetMapping("/api/memos/{id}")
    public Memo getOneMemo(@PathVariable Long id) {
        return memoService.getMemo(id);
    }

    @GetMapping("/api/memos")
    public List<Memo> getAllMemos() {
        String id = "id";
        return memoService.findMemosWithSorting(id);
    }

    @PostMapping("/api/memos")
    public Memo createMemo(@RequestBody MemoRequestDto requestDto, @AuthenticationPrincipal UserDetailsImpl userDetails) {

        //로그인 되어 있는 ID를 가져올 것이다. user의 이름이 아닌 table의 id를 가져 올 것이다.
        Long userId = userDetails.getUser().getId();

        Memo memo = memoService.createMemo(requestDto, userId);
        return memo;
    }

    // 고치는건 특정 유저 조건이 필요함
    @PutMapping("/api/memos/{id}")
    public Long updateMemo(@PathVariable Long id, @RequestBody MemoRequestDto requestDto) {
        memoService.update(id, requestDto);
        return id;
    }

    // 지우는건 특정 유저 조건이 필요함
    @DeleteMapping("/api/memos/{id}")
    public Long deleteMemo(@PathVariable Long id) {
        memoRepository.deleteById(id);
        return id;
    }
}