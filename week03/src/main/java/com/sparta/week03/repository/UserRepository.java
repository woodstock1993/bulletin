package com.sparta.week03.repository;

import com.sparta.week03.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    // 똑같은 카카오 유저가 다시 로그인 할 때 쓰는 기능
    // Optional 이라는 것은 class를 감싸서 사용하고 null check 용도로 사용한다.
    Optional<User> findByKakaoId(Long kakaoId);
}



