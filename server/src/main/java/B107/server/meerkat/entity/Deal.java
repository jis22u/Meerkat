package B107.server.meerkat.entity;

import B107.server.meerkat.config.utils.BaseAtTime;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "deal")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Deal extends BaseAtTime implements Serializable {

    // 거래 table Idx
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "response_idx")
    private Member resMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_idx")
    private Member reqMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "call_idx")
    private Call call;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @Column(name = "init_time")
    private LocalDateTime initTime;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @Column(name = "exit_time")
    private LocalDateTime exitTime;

    private Boolean reported;
    private Boolean permit;

}
