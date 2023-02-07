package B107.server.meerkat.entity;

import B107.server.meerkat.config.utils.BaseAtTime;
import B107.server.meerkat.config.utils.BooleanToYNConverter;
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
@Table(name = "call_check")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CallCheck implements Serializable {

    @Id
    @Column(name = "member_idx")
    private Long memberIdx;

    @Convert(converter = BooleanToYNConverter.class)
    @Column(name = "cc_check")
    @Convert(converter = BooleanToYNConverter.class)
    private Boolean ccCheck; // 요청가능여부

}
