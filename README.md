# John Byju — Full Stack Developer Portfolio

This is a modern, single-page developer portfolio application built using **React** and **Vite**, featuring a premium macOS IDE interface, typewriter animations, dynamic project filtering, and a live timezone clock.

## Features

*   **Live Clock**: Displaying Coimbatore, India (IST / UTC+5:30) local time dynamically inside the navbar.
*   **Animated Theme Toggler**: Smooth circular ripple transition expanding from your click position to switch between Light and Dark mode.
*   **macOS IDE slider**: Horizontal scroll track containing interactive work experience windows that support standard close and restore actions.
*   **Preloader**: Elegant signature drawing animation preloader fading out on complete.
*   **Dynamic Project Filters**: Live filtering of featured code items by tags (Frontend, Backend, Full Stack).
*   **Contact Form**: Validated AJAX messaging integrated via Formspree API.

## Getting Started

### Prerequisites

*   **Node.js** (LTS version recommended) installed on your computer.

### Installation

1.  Clone the repository and navigate to the project directory.
2.  Install all packages:
    ```bash
    npm install
    ```

### Scripts

*   **Start Local Dev Server**:
    ```bash
    npm run dev
    ```
*   **Build Production Bundle**:
    ```bash
    npm run build
    ```
*   **Run Automated E2E Tests**:
    ```bash
    npm run test
    ```

## Deployment

The project is configured to automatically build and deploy the React bundle directly to **GitHub Pages** using GitHub Actions workflows on pushes to the `main` branch.
