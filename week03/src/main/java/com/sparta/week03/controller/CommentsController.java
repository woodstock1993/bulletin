package com.sparta.week03.controller;

import com.sparta.week03.domain.Comments;
import com.sparta.week03.domain.Memo;
import com.sparta.week03.dto.CommentsRequestDto;
import com.sparta.week03.repository.CommentsRepository;
import com.sparta.week03.repository.MemoRepository;
import com.sparta.week03.service.CommentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CommentsController {

    private final MemoRepository memoRepository;
    private final CommentsRepository commentsRepository;

    private final CommentsService commentsService;

    @GetMapping("/api/comments/{id}")
    public List<Comments> pictureComments(@PathVariable Long id) {
        System.out.println("메모"+id+"입니다");
        return commentsRepository.findByMemoId(id);
    }

    @PostMapping("/api/comments/{id}")
    public Comments createComments(@PathVariable Long id, @RequestBody CommentsRequestDto commentsRequestDto) {
        Memo memo = memoRepository.findById(id).orElseThrow(
                ()-> new NullPointerException("메모에 해당하는 아이디가 없습니다."));
        Comments comments = new Comments(commentsRequestDto, memo);
        return commentsRepository.save(comments);
    }

    // 고치는건 특정 User 조건이 필요함
    @PutMapping("/api/comments/{comments_id}")
    public Long editComments(@PathVariable Long comments_id, @RequestBody CommentsRequestDto commentsRequestDto) {
        commentsService.commentsUpdate(comments_id, commentsRequestDto);
        return comments_id;
    }

    // 지우는건 특정 User 조건이 필요함
    @DeleteMapping("/api/comments/{comments_id}")
    public Long deleteComments(@PathVariable Long comments_id) {
        Comments comments = commentsRepository.findById(comments_id).orElseThrow(
                () -> new NullPointerException("찾으려는 comments ID가 없습니다")
        );
        commentsRepository.delete(comments);
        return comments_id;
    }
}
