package B107.server.meerkat.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

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
    @Column(name = "member_idx")
    private Long memberIdx;

    @ColumnDefault("0")
    private Integer coin; // 코인 보유량

}
