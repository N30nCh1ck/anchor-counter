import * as anchor from "@coral-xyz/anchor";
// import { Connection } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";

describe("counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Counter as Program<Counter>;
  const provider = anchor.getProvider();
  // const connection = new Connection("http://127.0.0.1:8899", "confirmed");

  const systemProgram = anchor.web3.SystemProgram;

  it("Create Counter!", async () => {
    // Keypair = account
    const [counter, _counterBump] =
      anchor.web3.PublicKey.findProgramAddressSync(
        [provider.publicKey.toBytes()],
        program.programId
      );
    console.log("Your counter address", counter.toString());
    const tx = await program.methods
      .createCounter()
      .accounts({
        authority: provider.publicKey,
        counter: counter,
        systemProgram: systemProgram.programId,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Fetch a counter!", async () => {
    // Keypair = account
    const [counterPubkey, _] = anchor.web3.PublicKey.findProgramAddressSync(
      [provider.publicKey.toBytes()],
      program.programId
    );
    console.log("Your counter address", counterPubkey.toString());
    const counter = await program.account.counter.fetch(counterPubkey);
    console.log("Your counter", counter);
  });

  it("Update a counter!", async () => {
    // Keypair = account
    const [counterPubkey, _] = anchor.web3.PublicKey.findProgramAddressSync(
      [provider.publicKey.toBytes()],
      program.programId
    );
    console.log("Your counter address", counterPubkey.toString());
    const counter = await program.account.counter.fetch(counterPubkey);
    console.log("Your counter", counter);
    const tx = await program.methods
      .updateCounter()
      .accounts({
        counter: counterPubkey,
      })
      .rpc();
    console.log("Your transaction signature", tx);
    const counterUpdated = await program.account.counter.fetch(counterPubkey);
    console.log("Your counter count is: ", counterUpdated.count.toNumber());
  });
});
