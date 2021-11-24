package com.sparta.week03.domain;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass // Entity가 자동으로 컬럼으로 인식합니다. 해당 클래스를 상속한 녀석이 자동으로 컬럼으로 잡아주는 역할
@EntityListeners(AuditingEntityListener.class) // 해당 클래스를 상속하는 Entity에 생성/변경 시간이 변경이 되면 자동으로 업데이트해준다.
public abstract class Timestamped { //추상 클래스는 상속을 통해서만 사용할 수 있다는 의미를 명시해 주는 부분

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;
}
