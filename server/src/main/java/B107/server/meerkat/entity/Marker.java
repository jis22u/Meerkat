package B107.server.meerkat.entity;

import B107.server.meerkat.config.utils.BaseAtTime;
import B107.server.meerkat.config.utils.BooleanToYNConverter;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "marker")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Marker extends BaseAtTime implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    // 등록자 IDX
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_idx")
    private Member member;

    private Double lat; // 위도
    private Double lng; // 경도
    private String location; // 위치 정보

    @Column(name = "reg_date")
    private LocalDateTime regDate; // 등록 시간

    @Column(name = "exp_date")
    private LocalDateTime expDate; // 종료 시간

    /**
     * 해당 마커가 유효한지 혹은 만료되어 유효하지 않은지
     * N: 유효함, Y: 만료되어 유효하지 않음
     */
    @ColumnDefault("'N'")
    @Convert(converter = BooleanToYNConverter.class)
    @Column(name = "is_exp")
    private Boolean isExp;

}
