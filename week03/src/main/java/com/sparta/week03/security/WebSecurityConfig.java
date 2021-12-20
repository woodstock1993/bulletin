package com.sparta.week03.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity // 스프링 Security 지원을 가능하게 함
@EnableGlobalMethodSecurity(securedEnabled = true) //Class 안의 Method 마다 role을 체크할 수 있는 설정
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.headers().frameOptions().disable();
        http.authorizeRequests()
                // image 폴더를 login 없이 허용
                .antMatchers("/images/**").permitAll()
                // css 폴더를 login 없이 허용
                .antMatchers("/css/**").permitAll()
                // 그 외 모든 요청은 인증과정 필요
                .antMatchers("/javascript/**").permitAll()
                .antMatchers("/").permitAll()
                .antMatchers("/api/memos").permitAll()
                .antMatchers("/paginationAndSort/**").permitAll()
                .antMatchers("/*.html").permitAll()
                .antMatchers(HttpMethod.GET,"/user/**").permitAll()
                .antMatchers(HttpMethod.GET,"/api/comments/**").permitAll()
                .antMatchers(HttpMethod.GET, "/comments.html/**").permitAll()
                .antMatchers(HttpMethod.GET,"/api/memos/**").permitAll()
                .and()
                .exceptionHandling()
                .accessDeniedPage("/user/forbidden");

    }

    // 다른 곳에서 사용할 수 있게 Bean 설정
    @Bean
    public BCryptPasswordEncoder encodePassword() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}