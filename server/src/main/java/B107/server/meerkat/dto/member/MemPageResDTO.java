package B107.server.meerkat.dto.member;

import B107.server.meerkat.entity.Call;
import B107.server.meerkat.entity.Coin;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class MemPageResDTO {
    private Integer coin;
    private List<MemPageDealDTO> memPageDealDTOReqList;
    private List<MemPageDealDTO> memPageDealDTOResList;

    @Builder
    public MemPageResDTO(Integer coin, List<MemPageDealDTO> memPageDealDTOReqList, List<MemPageDealDTO> memPageDealDTOResList) {
        this.coin = coin;
        this.memPageDealDTOResList = memPageDealDTOReqList;
        this.memPageDealDTOReqList = memPageDealDTOResList;
    }

    public MemPageResDTO of(Coin coin, List<MemPageDealDTO> memPageDealDTOReqList, List<MemPageDealDTO> memPageDealDTOResList) {
        return MemPageResDTO.builder().coin(coin.getCoin()).memPageDealDTOReqList(memPageDealDTOReqList).memPageDealDTOResList(memPageDealDTOResList).build();
    }
}
