package B107.vision.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "expired_marker")
@EntityScan
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExpiredMarker implements Serializable {

    @Id
    @Column(name = "idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    // 등록자 ID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private Float lat; // 위도
    private Float lng; // 경도
    private String location; // 위치 정보

    @Column(name = "reg_date")
    private LocalDateTime regDate; // 등록 시간

    @Column(name = "exp_date")
    private LocalDateTime expDate; // 종료 시간
}
