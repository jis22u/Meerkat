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
import java.util.Objects;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "marker_check")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MarkerCheck extends BaseAtTime implements Serializable {

    @Id
    @Column(name = "member_id")
    private String memberId;

    @Column(name = "mc_check")
    private Boolean mcCheck; // 사용자의 마커 등록 가능 여부 체크
}
