pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/drafts/Counters.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/GSN/GSNRecipient.sol";
import "@openzeppelin/upgrades/contracts/Initializable.sol";

contract Badge is Initializable, GSNRecipient, ERC721Full {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  mapping (uint256 => bool) private _transferable;

  constructor() ERC721Full("Stikkit", "Stikk") public {
  }

  function initialize() public initializer {
    GSNRecipient.initialize();
  }

  function awardItem(string memory tokenURI) public returns (uint256) {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(_msgSender(), newItemId);
    _setTokenURI(newItemId, tokenURI);
    _transferable[newItemId] = true;

    return newItemId;
  }

  function transferFrom(address from, address to, uint256 tokenId) public {
    //solhint-disable-next-line max-line-length
    require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
    require(_transferable[tokenId], "You can transfer only once");

    _transferFrom(from, to, tokenId);
    _transferable[tokenId] = false;
  }

  function burn(address owner, uint256 tokenId) public {
    _burn(owner, tokenId);
  }

  function acceptRelayedCall(
    address relay,
    address from,
    bytes calldata encodedFunction,
    uint256 transactionFee,
    uint256 gasPrice,
    uint256 gasLimit,
    uint256 nonce,
    bytes calldata approvalData,
    uint256 maxPossibleCharge
  ) external view returns (uint256, bytes memory) {
    return _approveRelayedCall();
  }
}
