package B107.server.meerkat.dto.member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class MemPageDealDTO {
    private String location;
    private Integer coin;
    private LocalDateTime exit_time;

    @Builder
    public MemPageDealDTO(String location, Integer coin, LocalDateTime exit_time) {
        this.location = location;
        this.coin = coin;
        this.exit_time = exit_time;
    }

    public MemPageDealDTO of(String location, Integer coin, LocalDateTime exit_time) {
        return MemPageDealDTO.builder().location(location).coin(coin).exit_time(exit_time).build();
    }
}