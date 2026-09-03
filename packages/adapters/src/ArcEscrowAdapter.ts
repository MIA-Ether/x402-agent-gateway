export interface EscrowAdapter {
  lockFunds(
    jobId: string,
    amount: number,
    receiverAddress: string
  ): Promise<string>;

  releaseFunds(escrowId: string): Promise<string>;
}

export class MockArcEscrowAdapter implements EscrowAdapter {
  async lockFunds(
    jobId: string,
    amount: number,
    receiverAddress: string
  ): Promise<string> {
    const escrowId = `mock-escrow-${jobId}`;

    console.log(
      `[ARC MOCK] Lock ${amount} USDC for ${receiverAddress} (${escrowId})`
    );

    return escrowId;
  }

  async releaseFunds(escrowId: string): Promise<string> {
    const txId = `mock-release-${Date.now()}`;

    console.log(
      `[ARC MOCK] Release ${escrowId} -> ${txId}`
    );

    return txId;
  }
}
