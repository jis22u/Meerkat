package B107.server.meerkat.entity;

import B107.server.meerkat.config.utils.BaseAtTime;
import B107.server.meerkat.config.utils.BooleanToYNConverter;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Optional;

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
    @Column(name = "idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    // 등록자 IDX
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_idx")
    private Member member;

    private Float lat; // 위도
    private Float lng; // 경도
    private String location; // 위치 정보

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @Column(name = "reg_date")
    private LocalDateTime regDate; // 등록 시간

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
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
