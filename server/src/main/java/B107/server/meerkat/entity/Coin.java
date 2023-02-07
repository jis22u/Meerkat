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
@Table(name = "coin")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Coin implements Serializable {

    @Id
    @Column(name = "member_id")
    private String memberId;

    private Integer coin; // 코인 보유량

}
