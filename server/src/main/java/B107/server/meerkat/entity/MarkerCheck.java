package B107.server.meerkat.entity;

import B107.server.meerkat.config.utils.BooleanToYNConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "marker_check")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MarkerCheck implements Serializable {

    @Id
    @Column(name = "member_idx")
    private Long memberIdx;


    // 사용자의 마커 등록 여부 체크
    // true: 등록함 | false: 등록안함
    @Column(name = "mc_check")
    @Convert(converter = BooleanToYNConverter.class)
    private Boolean mcCheck;

}
