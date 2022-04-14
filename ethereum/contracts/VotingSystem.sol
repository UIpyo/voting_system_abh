// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract VotingFactory{
    // ==== Fields ====
    VotingSystem[] public deployedElections;
    constructor(){

    }
    function createElection(string memory _name, uint8 _level, uint8 _electionType,address payable _address) public {
        VotingSystem newElection = new VotingSystem(_name,_level,_electionType,_address);
        deployedElections.push(newElection);
    }

    function getDeployedElections() public view returns (VotingSystem[] memory){
        return deployedElections;
    }
    
}

contract VotingSystem{

    address payable administrator;
    // mapping (address => bool) registeredList;
    Election electionInfo;
    // mapping (address => Status) voters;
    mapping (address => Voter) voters;
    mapping (uint8 => uint) voteCount;
    // mapping (int8 => Candidate) candidates;
    mapping (address => Candidate) candidates;
    // uint8 candidateNumber;
    
    enum Level {local, state, country}
    enum ElectionType {regular, filling}
    enum Status {registered, approved, voted}
     //false once voted or if changed the address

    uint totalVote;

    struct Candidate {
        string name;
        string party;
        uint8 age;
        uint aadharNumber;
        Status candidateStatus;
        // address candidateAddress;
    }

    // RETHINK: need to have voter's information in the blockchain or not
    struct Voter {
        string name;
        uint8 age;
        uint aadharNumber;
        uint phoneNumber;
        Status currStatus;
    }

    struct Election {
        string name;
        Level level;
        ElectionType electionType;
    }

    modifier onlyAdmin {
        require(administrator == msg.sender, "Only administrators have the access to this action");
        _;
    }

// take the election info during construction of the contract
    constructor(string memory _name, uint8 _level, uint8 _electionType, address payable _address) {
        administrator = _address;
        require(_level <= 2, "Out of bound");
        require(_electionType <= 1, "Out of bound");
        electionInfo = Election(_name, Level(_level), ElectionType(_electionType));
    }

    function vote(uint8 index) public {
        require(voters[msg.sender].currStatus == Status.approved, "Either you not registered or already voted");
        voteCount[index]++;
        totalVote++;
        voters[msg.sender].currStatus = Status.voted;
    }

    // can a person register more than once with this function ?
    function registerVoter(string memory _name, uint8 _age, uint _aadharNumber, uint _phone) public {
        Voter memory newVoter = Voter(_name, _age, _aadharNumber, _phone, Status.registered);
        voters[msg.sender] = newVoter;
    }

    //register candidate
    function registerCandidate(string memory _name, string memory _party, uint8 _age, uint _aadharNumber) public payable {
        Candidate memory newCandidate = Candidate(_name, _party, _age, _aadharNumber, Status.registered);
        candidates[msg.sender] = newCandidate;
        require(msg.value == 1 ether, "Amount should be exactly equal to 1 ETHER");
        administrator.transfer(msg.value);
    } 

    function approveCandidate(address _address) public {
        // after approving candidate add them in a seperate place with an ID
        require(candidates[_address].candidateStatus == Status.registered,"Candidate not registered");
        require(candidates[_address].age >= 30, "Candidate is not eligible");
        candidates[_address].candidateStatus = Status.approved;
    }

    // should I also add register candidate and then approveCandidate or just addCandidate
    // ----> Need to remove this probably
    // function addCandidate(string memory _name, string memory _party, uint8 _age, address _address) public onlyAdmin{
    //     // Candidate storage newCandidate = candidates[candidateNumber];
    //     Candidate storage newCandidate = candidates[_address];
    //     newCandidate.name = _name;
    //     newCandidate.party = _party;
    //     newCandidate.age = _age;
    //     // newCandidate.candidateAddress = _address;
    //     newCandidate.candidateStatus = Status.approved;
    // }

    function approveVoter(address votersAddress) public onlyAdmin{
        require(voters[votersAddress].currStatus == Status.registered, "Either the voter is not registered or already approved");
        require(voters[votersAddress].age >= 18, "Not an eligible voter");
        voters[votersAddress].currStatus = Status.approved;
    }

    function getPersonalInfo() public view returns(string memory, uint8, uint, uint, Status) {
        Voter memory prsInfo = voters[msg.sender];
        return(prsInfo.name, prsInfo.age, prsInfo.aadharNumber, prsInfo.phoneNumber, prsInfo.currStatus);
    }
    //create show functions that can give the data about the user, candidate, election
}