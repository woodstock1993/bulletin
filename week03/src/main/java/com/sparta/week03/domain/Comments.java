package com.sparta.week03.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sparta.week03.dto.CommentsRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class Comments extends Timestamped {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column
    private String comment;

    @JsonIgnore
    @JoinColumn
    @ManyToOne
    private Memo memo;

    // 생성자를 통한 연관관계 설정
    public Comments(CommentsRequestDto requestDto, Memo memo) {
        this.comment = requestDto.getComments();
        this.memo = memo;
    }

    public void update(CommentsRequestDto requestDto) {
        this.comment = requestDto.getComments();
    }
}
