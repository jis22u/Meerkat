//package B107.server.meerkat.dto.member;
//
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//public class memberReqDTO {
//    private Long empId;
//    private String empNo;
//    private String name;
//    private String tel;
//    private String profileImg;
//    private TeamResDTO team;
//    private PositionResDTO position;
//
//    @Builder
//    public EmpResDTO(Long empId, String empNo, String name, String tel, String profileImg, TeamResDTO team, PositionResDTO position) {
//        this.empId = empId;
//        this.empNo = empNo;
//        this.name = name;
//        this.tel = tel;
//        this.profileImg = profileImg;
//        this.team = team;
//        this.position = position;
//    }
//
//    public EmpResDTO of(Employee employee) {
//        return EmpResDTO.builder().empId(employee.getId()).empNo(employee.getEmpNo()).name(employee.getName()).tel(employee.getTel()).profileImg(employee.getProfileImg()).team(TeamResDTO.builder().build().of(employee.getTeam())).position(PositionResDTO.builder().build().of(employee.getPosition())).build();
//    }
//}