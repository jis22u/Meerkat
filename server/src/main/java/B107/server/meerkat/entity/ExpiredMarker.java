package B107.server.meerkat.entity;

import B107.server.meerkat.config.utils.BaseAtTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "expired_marker")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExpiredMarker extends BaseAtTime implements Serializable {

    @Id
    @Column(name = "idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;


    // 마커 테이블에서 넘어온 idx
    @Column(name = "marker_idx")
    private Long markerIdx;

    // 등록자 IDX
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_idx")
    private Member member;

    private Float lat; // 위도
    private Float lng; // 경도
    private String location; // 위치 정보

    @Column(name = "reg_date")
    private LocalDateTime regDate; // 등록 시간

    @Column(name = "exp_date")
    private LocalDateTime expDate; // 종료 시간

}
