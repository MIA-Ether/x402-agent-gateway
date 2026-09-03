import type { AuditEvent, JobStatus } from "@x402/core";

export class MockHederaAuditAdapter {
  private events: AuditEvent[] = [];

  async logEvent(
    jobId: string,
    status: JobStatus,
    message: string
  ): Promise<void> {
    const event: AuditEvent = {
      id: `event-${this.events.length + 1}`,
      jobId,
      status,
      message,
      timestamp: new Date().toISOString()
    };

    this.events.push(event);

    console.log(
      `[HEDERA MOCK] ${status}: ${message}`
    );
  }

  getEvents(): AuditEvent[] {
    return [...this.events];
  }
}
