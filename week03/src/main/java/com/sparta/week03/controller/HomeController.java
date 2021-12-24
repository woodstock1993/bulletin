package com.sparta.week03.controller;

import com.sparta.week03.security.UserDetailsImpl;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller //
public class HomeController {
    //스피링 시큐리티가 로그인된 사용자의 정보를 넘겨주게 됨, 타임리프와 관련된 부분
    @GetMapping("/login/user")
    public String home(Model model, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        // @AuthenticationPrincipal 해당 부문은 로그인했을 때 서버 쪽에서 userDetails 부문에 정보를 주입해주는 역할을 담당한다. SSR을 걷어내서 해당 api는 의미가 없지만 정보를 위해 적음
        model.addAttribute("username", userDetails.getUsername());
        return "index";
    }

    // 접근 불가 페이지에 접근했을 시
    @GetMapping("/user/forbidden")
    public String forbidden() {
        return "forbidden";
    }
}