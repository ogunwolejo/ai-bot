# I Chatbot with Universal Prompt - Tiered Requirements

## Tier 2: Universal Prompt Integration (Customization Layer)

Objective:

- Allow users (or admins) to define a persistent prompt that applies to all user inputs.

Functional Requirements:

- T2-FR1: Add a settings section with a text area to input a "Universal Prompt".
- T2-FR2: All user inputs should be modified by prepending the universal prompt before sending to AI.
- T2-FR3: Changes to the prompt take effect immediately without refreshing the session.

Acceptance Criteria:

- T2-TC1: Enter a prompt in settings → Prompt is stored successfully.
- T2-TC2: Send user input after setting prompt → Bot responds with prompt-influenced reply.
- T2-TC3: Update prompt during session → New inputs reflect the updated prompt.

## Tier 3: Prompt Management UX (Enhanced Control Layer)

Objective:

- Improve usability of the prompt setting and provide control features.

Functional Requirements:

- T3-FR1: Show an indicator in the chat UI that a universal prompt is active.
- T3-FR2: Add a "Clear Prompt" button to reset chatbot to default behavior.
- T3-FR3: Support multiline input and auto-save for prompt changes.

Acceptance Criteria:

- T3-TC1: Edit prompt with multiline text → No UI issues or truncation.
- T3-TC2: Clear the universal prompt → Bot returns to standard AI behavior.
- T3-TC3: See prompt status in UI → Indicator is visible and accurate.

## Tier 4: Persistence and Device Support (Reliability Layer)

Objective:

- Ensure data and functionality persist across sessions and devices.

Functional Requirements:

- T4-FR1: Save the universal prompt to local storage or backend to persist after page reload.
- T4-FR2: Ensure chatbot works and looks correct on mobile and desktop.
- T4-FR3: Add a loading indicator when waiting for responses.

Acceptance Criteria:

- T4-TC1: Reload page after saving prompt → Prompt is retained.
- T4-TC2: Use chatbot on mobile → MainLayout adapts responsively.
- T4-TC3: Observe loading state → Spinner shows during response time.
