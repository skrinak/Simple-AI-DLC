# The Simple-AI-DLC: An AI-Driven Development Lifecycle for Enterprise Teams

*A simple, memorable, and immediately deployable alternative to complex AI development methodologies.*

**[Interactive Diagram](https://s3.us-east-1.amazonaws.com/test.tube/Simple-AI-DLC/index.html)** — React Flow + MUI v5 visualization with dark/light toggle and PNG export

---

## The Problem

The [AWS AI-DLC](https://prod.d13rzhkk8cj2z0.amplifyapp.com/) correctly identifies what matters: "AI should drive development, not assist it." However, its implementation proves too cumbersome for practical adoption. Teams acknowledge the framework but revert to basic ChatGPT prompting.

The April 2026 Claude Code source leak revealed something crucial: the most successful AI agent in production ($2.5B run rate) operates through "twelve boring engineering primitives" including tool registries, permission tiers, crash recovery, and token budgets rather than complex orchestration.

The Simple-AI-DLC preserves the AI-DLC's core objectives while stripping away ceremony, rebuilding on these proven primitives. It maps to the full AWS developer stack: Kiro for spec-driven Inception, Kiro CLI for terminal-based agentic coding, Amazon Q Developer for IDE-integrated coding assistance, Amazon Bedrock as the model layer, Strands Agents for building agents with proper primitives, and AgentCore for production operations.

---

## Ten Tenets

Tenets represent load-bearing decisions made in advance to prevent repeated team deliberation.

1. **AI drives, humans decide.** The agent proposes architecture, decomposes work, generates code, and runs tests. Humans establish intent, validate output, and accept responsibility. The agent functions as engine; you function as steering mechanism.

2. **Context is the product.** A well-structured CLAUDE.md, clear PRD, and disciplined task list produce superior software compared to brilliant developers with vague prompts. Prioritize context development before code investment.

3. **Plan the work, then work the plan.** No code develops until requirements are documented (PRD), tasks are decomposed, and dependencies are mapped. This provides minimum structure for agents to produce useful work without scope hallucination.

4. **Agents crash. Build for it.** Session persistence, workflow checkpoints, and token budgets separate products from demos. Save state obsessively. Resume gracefully.

5. **Permissions are architecture.** Every agent-accessible tool requires risk classification: read-only, mutating, or destructive. Destructive actions demand explicit human approval. No exceptions. No shortcuts.

6. **Clear early, clear often.** Context rot and catastrophic forgetting represent the two most common failure modes in AI-driven development. The solution: clear context at 80% capacity, between phases, and before complex problems. Reload from your source of truth.

7. **Small tasks, fast cycles.** Every task should complete within a single agent session. Tasks exceeding 30 minutes or affecting more than 5 files require decomposition. This constraint prevents compounding errors.

8. **Verify the work and the harness.** Two verification levels apply: (1) Did the agent complete this task correctly? (2) Did my changes to the development environment break any guardrails? Both matter equally.

9. **Eighty percent plumbing.** Building with AI agents involves 80% non-glamorous infrastructure: registries, logging, permissions, crash recovery, and 20% model interaction. Teams skipping plumbing build demos; teams investing in it build products.

10. **Complexity is debt with interest.** Start with a single agent. Add coordination only when evidence supports necessity. The most common failure mode involves overengineering: constructing multi-agent orchestration before sessions survive crashes.

---

## Three Phases

The Simple-AI-DLC retains the AI-DLC's three phases — Inception, Construction, Operations — but reduces each to essential actions. No mob rituals beyond task requirements.

### The AWS Stack

| Layer | AWS Service | Role in the Simple-AI-DLC |
|-------|-------------|------------------------|
| **Model** | Amazon Bedrock | Foundation model access: Claude, Nova, and others. The inference engine underneath every phase. |
| **Inception** | Kiro | Spec-driven IDE that generates requirements, design docs, and task lists before a line of code is written. |
| **Terminal** | Kiro CLI | Agentic coding in the terminal: chat, custom agents, steering files, hooks, and MCP servers. The direct Claude Code equivalent on AWS. |
| **IDE Assistant** | Amazon Q Developer | AI coding assistant with `/dev`, `/review`, `/transform`, and `/doc` agents, inline suggestions, and security scanning. Available in VS Code, JetBrains, and the AWS Console. |
| **Agent SDK** | Strands Agents | Open-source SDK for building agents with tool registries, steering hooks, and session management: the 12 primitives in code. |
| **Runtime** | AgentCore | Managed runtime for deploying agents at scale: session isolation, identity federation, Cedar policy enforcement, and observability. |

These services function as layers rather than alternatives. Bedrock provides models. Kiro plans work. Kiro CLI brings that workflow to the terminal. Amazon Q Developer adds AI assistance inside the IDE. Strands builds agents. AgentCore runs them in production. Simple-AI-DLC tenets govern usage across all six.

---

### Phase 1: Inception

**Goal: Transform a business intent into a structured, AI-consumable plan.**

* A human states the intent: system objectives and purpose
* The AI acts as senior product manager: asks clarifying questions, identifies personas, proposes user stories, flags risks, recommends architecture
* The output is a **PRD** built through 4 iterative rounds:
  * **Round 1, Foundation:** Personas, user journeys, high-level architecture
  * **Round 2, Technical depth:** Infrastructure, data flows, security model
  * **Round 3, Implementation plan:** Environments, testing strategy, monitoring
  * **Round 4, Task decomposition:** Atomic tasks, parallel execution opportunities, verification criteria

#### In Claude Code:

```
/init
# Use the PRD skill to drive interactive requirements gathering
# The skill walks through all 4 rounds, producing PRD.md
```

#### In Kiro:

Kiro's spec-driven workflow serves as the purpose-built Inception phase. Where Claude Code uses a PRD skill, Kiro integrates Inception as a first-class IDE feature:

```
# Kiro generates three artifacts in .kiro/specs/[feature-name]/
requirements.md   # User stories with EARS notation acceptance criteria
design.md         # Architecture, sequence diagrams, data flow, testing strategy
tasks.md          # Sequenced, dependency-mapped implementation tasks
```

Kiro's steering files (`.kiro/steering/`) serve the same function as CLAUDE.md: `product.md` defines purpose and users, `tech.md` defines frameworks and constraints, `structure.md` defines file organization. The constitution concept remains identical; file names differ.

#### In Kiro CLI:

The same steering-driven workflow, from the terminal:

```bash
kiro chat "Generate a PRD for [your intent]. Walk through personas,
           architecture, data flows, and task decomposition."

# Steering files load automatically, giving the agent persistent project knowledge
# Resume previous sessions to iterate across rounds
kiro chat --resume
```

Kiro CLI steering files (`.kiro/steering/`) load at the start of every session — the same constitutional mechanism as CLAUDE.md. Custom agents can scope Inception work further: a `prd-writer` agent with its own system prompt, tools, and permissions focused exclusively on requirements gathering.

#### In Amazon Q Developer:

```
/dev  Design a serverless API with Lambda, API Gateway, and DynamoDB
      for a task management system. Include CRUD operations,
      authentication via Cognito, and IaC templates.
```

Amazon Q Developer's `/dev` agent breaks down the prompt into logical implementation steps, generates code across multiple files, and lets you review and iterate before applying changes. Its deep knowledge of 17 years of AWS architecture patterns makes it particularly strong for infrastructure-aware bootstrapping. The `/doc` agent can then generate documentation with data flow diagrams from the resulting code.

The PRD serves not as formality but as the singular document preventing agent scope hallucination, invented requirements, or incorrect implementations. A 2-hour PRD investment prevents 20 hours of rework.

---

### Phase 2: Construction

**Goal: Convert the PRD into working, tested, deployable code.**

* The PRD converts into a **task list**: an ordered, dependency-aware checklist of atomic work items
* Each task follows a mandatory sequence: search existing code → review constraints → security review → implement → test → lint → commit
* The AI executes tasks one at a time, maintaining a single focused session per task
* Context receives active management: clear between tasks, reload CLAUDE.md and task state, continue

#### The construction cycle for each task:

```
┌─────────────────────────────────────┐
│  1. Read CLAUDE.md (constraints)    │
│  2. Read task from tasks.md         │
│  3. Search existing code first      │
│  4. Implement (match patterns)      │
│  5. Test                            │
│  6. Lint / typecheck                │
│  7. Mark task complete              │
│  8. /clear if context > 80%        │
└─────────────────────────────────────┘
```

#### Key rules:

* Never modify code without reading every file that imports or calls the target
* Match existing patterns. The codebase is the style guide
* If a task is blocked, document why and move to the next unblocked task
* Never batch tests at the end. Every task includes its own verification

#### In Kiro CLI:

Kiro CLI mirrors the Claude Code construction cycle in the terminal with steering, hooks, and custom agents:

```bash
# Construction with persistent project conventions
kiro chat "Implement the authentication module following existing patterns."

# Custom agents scope the construction work
kiro agent create security-reviewer
# Each agent gets its own tools, permissions, system prompt, and MCP servers

# Hooks enforce the construction cycle automatically:
#   preToolUse  → validate before file writes or shell commands
#   postToolUse → run formatters and linters after every edit
#   stop        → trigger test suites when the agent finishes
```

Kiro CLI hooks map directly to Claude Code hooks: `preToolUse` validates before execution (matching `fs_write`, `execute_bash`), `postToolUse` runs formatters after edits, and `stop` triggers compilation or tests when the agent finishes responding. The `allowedTools` configuration enforces permission tiers — tools like `read` run without prompting while `shell` requires approval.

#### In Amazon Q Developer:

Amazon Q Developer provides purpose-built agents for construction:

```
/dev        Implement the user authentication flow with JWT tokens,
            refresh token rotation, and role-based access control.

/review     (Automated code review: logical errors, anti-patterns,
             security vulnerabilities, and AWS best practices)

/transform  Upgrade the Java 11 codebase to Java 17, including
            dependency updates and API migration.

/doc        Generate documentation with data flow diagrams
            from the existing codebase.
```

| Agent | Construction Role |
|-------|------------------|
| `/dev` | Feature implementation with workspace-aware code generation across multiple files |
| `/review` | Automated code review: vulnerabilities, anti-patterns, duplication, naming violations |
| `/transform` | Language and framework upgrades with automated dependency migration |
| `/doc` | Documentation generation with data flow diagrams from existing code |
| Inline suggestions | Real-time code completions across 25+ languages |
| Security scanning | Continuous vulnerability detection aligned with OWASP and CWE standards |

#### Building agents with Strands:

When the system you're constructing is itself an agent, Strands Agents is where the 12 primitives become code:

```python
from strands import Agent, tool
from strands.models import BedrockModel

@tool
def check_compliance(resource_arn: str) -> dict:
    """Check if an AWS resource meets compliance requirements."""
    ...

model = BedrockModel(model_id="us.anthropic.claude-sonnet-4-6-v1:0")

agent = Agent(
    model=model,
    tools=[check_compliance],
    system_prompt="You are a compliance auditor...",
    hooks=[approval_hook],
    conversation_manager=sliding_window_manager,
)
```

#### Primitives to Strands mapping:

| Primitive | Strands Implementation |
|-----------|------------------------|
| 1. Tool Registry | `@tool` decorator with auto-generated JSON schema from type hints |
| 2. Permission Tiers | Steering hooks: `BeforeToolCallEvent` can inspect, modify, or cancel any tool call |
| 3. Session Persistence | `session_manager` parameter: persist and restore full agent state |
| 5. Token Budget | `conversation_manager` with `SlidingWindowConversationManager` handles overflow automatically |
| 6. Streaming Events | `callback_handler` emits typed events during the agent loop |
| 9. Tool Pool Assembly | Tools loaded dynamically: functions, modules, file paths, MCP servers, or other agents |
| 12. Agent Type System | Agents-as-tools: `agent.as_tool(name=..., description=...)` for constrained multi-agent composition |

---

### Phase 3: Operations

**Goal: Deploy, monitor, and maintain the system in production.**

* Infrastructure-as-Code generates from architecture decisions made in Inception
* Deployment follows the security model defined in CLAUDE.md (region constraints, encryption standards, IAM policies)
* The AI monitors telemetry, proposes scaling actions, and integrates with incident runbooks
* Post-deployment verification confirms the system meets NFRs defined in the PRD

#### With AgentCore:

| Operational Primitive | AgentCore Service |
|-----------------------|-------------------|
| 3. Session Persistence | **Runtime**: each session gets isolated compute; state persists across interactions up to 8 hours |
| 5. Permissions / Trust Tiers | **Policy Service**: Cedar policies intercept every tool call in real-time. Author policies in natural language. |
| 6. Streaming Events | **Observability**: OpenTelemetry traces, token usage, latency, error rates via CloudWatch |
| 7. System Event Logging | **Observability**: dashboards with sensitive data masking |
| 9. Tool Pool Assembly | **Gateway**: transforms APIs and Lambda functions into agent-compatible tools with semantic discovery |
| 11. Permission Audit Trail | **Identity**: federated auth via Cognito, Entra ID, Okta. Agents act on behalf of users with delegated credentials. |

AgentCore is framework-agnostic: it runs Strands, LangGraph, CrewAI, or any containerized agent. It auto-scales from zero to thousands of concurrent sessions with per-second billing.

#### With Kiro CLI:

Custom agents turn Kiro CLI into a DevOps terminal:

```bash
# Create a specialized DevOps agent with infrastructure tools
kiro chat --agent devops "Deploy the staging environment and run health checks."

# Query AWS resources conversationally
kiro chat "What EC2 instances are running in us-west-2? Show their health."

# Extend reach with MCP servers
kiro mcp add --name terraform --command terraform-mcp-server
kiro mcp add --name cloudwatch --command cw-mcp-server
```

Kiro CLI agents can manage AWS infrastructure, generate Terraform scripts, deploy EKS clusters, and query resources directly — all from conversational commands with full access to your AWS credentials and CLI environment.

#### With Amazon Q Developer:

Amazon Q Developer provides operational intelligence across the AWS Console and IDE:

| Capability | Operations Role |
|-----------|----------------|
| Console integration | Troubleshoot services, optimize costs, and configure resources conversationally |
| Operational investigation | Root-cause analysis using CloudWatch, X-Ray, and observability data |
| Infrastructure as Code | Generate CloudFormation, CDK, or Terraform templates from architecture descriptions |
| Console-to-Code | Convert manual AWS console actions into deployable, repeatable IaC |
| Account intelligence | Query your running resources, billing, and permissions in natural language |

---

## The Twelve Primitives

These engineering primitives emerged from the Claude Code architecture leak. They organize into two tiers: **Day One** (non-negotiable from the start) and **Operational Maturity** (add as the system scales).

### Day One: Non-Negotiables

#### 1. Tool Registry with Metadata-First Design

Every capability the agent can use is declared in a searchable registry before any code runs. Claude Code maintains two parallel registries: 207 user-facing commands and 184 model-facing tools. Each entry carries a name, source, and description. Implementations load on demand.

#### 2. Permission System with Trust Tiers

Not all tools carry the same risk. Classify risk. Apply different approval requirements per tier. Claude Code segments capabilities into three trust tiers: built-in (highest trust, always available), plug-in (medium trust, can be disabled), and skills (lowest trust, user-defined). The Bash tool alone features an 18-module security architecture.

#### 3. Session Persistence That Survives Crashes

The session is not just conversation history. It is a recoverable state: messages, token usage, permissions, and configuration. Claude Code persists full sessions as JSON. After a crash, it reconstructs the complete agentic engine.

#### 4. Workflow State vs. Conversation State

Resuming a conversation is not the same as resuming a workflow. Track both. A conversation transcript answers "what have we said?" A workflow state answers "what step are we in, what side effects have happened, and is this safe to retry?"

#### 5. Token Budget Tracking

Every turn calculates projected token usage. If the projection exceeds the budget, execution stops before the API call is made. Clear at 80% capacity. Use `/compact` for automatic context compression.

#### 6. Structured Streaming Events

Every streaming event is an opportunity to communicate system state, not just text output. Claude Code emits typed events: `message_start`, `tool_match`, `command_match`, and crash events with structured reasons.

#### 7. System Event Logging

The conversation transcript tells you what the agent said. The event log tells you what it did. Claude Code maintains a separate history of system events: context loaded, registry initialization, routing decisions, execution counts, permission denials.

#### 8. Two-Level Verification

Level 1: Did the agent complete the task correctly? Level 2: Did changes to the harness break any guardrails? Claude Code includes verification tests for both.

### Operational Maturity: Scale When Ready

#### 9. Tool Pool Assembly

A general-purpose agent with 184 tools doesn't load all of them every session. It assembles a session-specific pool based on context. Not every task needs every MCP server.

#### 10. Transcript Compaction

Automatically compress conversation history after a configurable threshold. Design your workflow so no single conversation needs full history. The PRD carries forward requirements. The task list carries forward progress. CLAUDE.md carries forward constraints.

#### 11. Permission Audit Trail

Permissions are not a boolean gate. They are a first-class object you can query, replay, and audit. Every permission decision, granted or denied, should be logged with enough context to replay it. Non-negotiable for enterprise compliance.

#### 12. Agent Type System

Don't spawn agents randomly. Constrain roles sharply into observable types with specific tools and behavioral limits. Claude Code defines six built-in agent types: **Explore** (read-only), **Plan** (designs, cannot execute), **Verify** (checks, cannot modify), **Guide** (answers questions), **General Purpose** (full capabilities), and **Status Line Setup** (specialized configuration).

---

## The Memory Architecture

The three-tier memory model answers both the AI-DLC's "context memory" concept and the Claude Code leak's session persistence primitive.

### Tier 1: The Constitution (CLAUDE.md)

Loads at the start of every session. Contains immutable truths: constraints, standards, architecture, security posture. Version-controlled. Changes require review. Amended rarely, followed always.

### Tier 2: Case Law (Memory Files)

Memory files in `.claude/memory/` accumulate lessons learned across sessions:

* **User memories:** Role, expertise, preferences
* **Feedback memories:** Corrections and confirmations
* **Project memories:** Active initiatives, deadlines, stakeholder decisions
* **Reference memories:** Pointers to external systems

### Tier 3: Live Testimony (In-Conversation)

The active session context: current task, recent file reads, corrections made in real time. Ephemeral by design. When the context degrades, `/clear` and reload Tiers 1 and 2.

#### Tool Equivalents Across the Memory Tiers

| Memory Tier | Claude Code | Kiro / Kiro CLI | Amazon Q Developer |
|-------------|-------------|-----------------|-------------------|
| Tier 1: Constitution | `CLAUDE.md` | `.kiro/steering/` — `product.md`, `tech.md`, `structure.md`, plus custom files | Workspace context + customization profiles |
| Tier 2: Case Law | `.claude/memory/` files | Conversation history per directory, custom agent configs in `.kiro/agents/` | Code customization trained on private repositories |
| Tier 3: Live Testimony | Active session context | `kiro chat` session (`--resume` to continue) | IDE chat context, inline suggestion context |

---

## Quick Reference

| AI-DLC Concept | Simple-AI-DLC Equivalent | Claude Code | Kiro / Kiro CLI | Amazon Q Developer | Strands / AgentCore |
|---|---|---|---|---|---|
| Intent | PRD | PRD skill, `/init` | Kiro spec workflow, `kiro chat` | `/dev` agent bootstrapping | Bedrock (model layer) |
| Units & Bolts | Atomic tasks in tasks.md | Task generation skill | Kiro tasks.md generation | `/dev` step decomposition | \- |
| Mob Elaboration | AI-driven PRD conversation | `/init` interactive rounds | Kiro requirements.md, `kiro chat --resume` | `/dev` iterative review | \- |
| Mob Construction | Developer + agent construction cycles | `/clear` discipline | Kiro CLI hooks + custom agents | `/dev` + `/review` + inline suggestions | Strands `@tool` + hooks |
| Domain Design (DDD) | Embedded in PRD Round 2 | Agent asks architecture questions | Kiro design.md, steering files | AWS architecture knowledge (17 years) | \- |
| Logical Design | Constitution constraints | CLAUDE.md loaded every session | `.kiro/steering/tech.md` | Workspace context | \- |
| 9-step workflow | 3 phases, 4 PRD rounds, atomic tasks | Skills, slash commands, memory files | Kiro specs → Kiro CLI agents → hooks | `/dev` → `/review` → `/transform` | Strands → AgentCore |
| Context memory | Three-tier memory architecture | CLAUDE.md + `.claude/memory/` + session | `.kiro/steering/` + chat history + session | Workspace + code customization + IDE chat | AgentCore Memory service |
| Human oversight | Verify the work and the harness (Tenet 8) | Two-level verification | `preToolUse` / `postToolUse` hooks | `/review` automated code review | AgentCore Policy (Cedar) |
| Production deployment | IaC + monitoring | CloudFormation / CDK | Kiro CLI DevOps agents, MCP servers | IaC generation, Console-to-Code | AgentCore Runtime + Observability |
| Tool connectivity | MCP servers, skills | `.claude/settings.json` | `kiro mcp add`, `.kiro/agents/` configs | IDE extensions, AWS Console integration | AgentCore Gateway + Strands MCP |
| Identity & access | Permission tiers | Trust tiers in settings.json | `allowedTools`, hook matchers | Enterprise access controls, IAM integration | AgentCore Identity (Cognito, Entra, Okta) |
| Security | Continuous scanning | Permission system, Bash security | `preToolUse` validation hooks | OWASP/CWE vulnerability scanning, secrets detection | Cedar policies, audit trails |

---

## What This Is Not

* **Not a framework to install.** It is a set of tenets and practices. Your CLAUDE.md, your PRD template, your task list format: these are the implementation.
* **Not model-specific.** The tenets apply regardless of which LLM you use. Claude Code, Kiro, Kiro CLI, Amazon Q Developer, Strands, and AgentCore represent one instantiation on AWS. The primitives are universal.
* **Not a replacement for engineering judgment.** The AI drives. You decide. If the agent proposes something violating your security model, your compliance requirements, or your common sense, you stop it. That is the job.

---

## Interactive Diagram

The `diagram/` directory contains a React Flow + MUI v5 interactive visualization of the methodology.

```bash
cd diagram
npm install
npm run dev
```

Open http://localhost:3000 to explore. Features include dark/light theme toggle and full-scale PNG export.

---

*The Simple-AI-DLC: Ten tenets. Twelve primitives. Three phases. One constitution. Plan in Kiro, code with Kiro CLI, assist with Amazon Q Developer, compose with Strands, run on AgentCore, powered by Bedrock. Ship enterprise software with AI agents that don't just work — they work safely, recoverably, and at scale.*
