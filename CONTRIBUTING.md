# Contributing to TruthMatrix

Thank you for your interest in contributing to TruthMatrix! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check the issue list to see if the bug has already been reported. When creating a bug report, include:

1. **Clear title**: What is the bug?
2. **Detailed description**: What happened and what did you expect to happen?
3. **Steps to reproduce**: Exact steps to reproduce the issue
4. **Code samples**: Include code that demonstrates the problem
5. **Environment**: OS, Node version, npm version, etc.
6. **Screenshots**: If applicable

### Suggesting Features

Before suggesting a feature, check if it has been suggested already. When suggesting a feature, include:

1. **Clear title**: Short description of the feature
2. **Detailed description**: Explain the feature and use case
3. **Example**: How would the feature be used?
4. **Additional context**: Any other relevant information

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Make your changes**: Follow code style guidelines
4. **Test your changes**: Ensure all tests pass
5. **Commit your changes**: Use clear commit messages
6. **Push to your fork**: `git push origin feature/your-feature`
7. **Create Pull Request**: Include description of changes

#### Pull Request Guidelines

- Keep PRs focused on a single feature/fix
- Include tests for new functionality
- Update documentation as needed
- Follow the existing code style
- Reference related issues

## Development Setup

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/truthmatrix.git
   cd truthmatrix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env.local`**
   ```bash
   cp .env.example .env.local
   # Add your Google Generative AI API key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Run linter**
   ```bash
   npm run lint
   ```

## Code Style

### TypeScript
- Use TypeScript for all code files
- Enable strict mode
- Avoid `any` types
- Use meaningful variable names

### React
- Use functional components
- Use React hooks
- Keep components small and focused
- Prop destructuring preferred

### CSS
- Use Tailwind CSS classes
- Follow Tailwind best practices
- Keep styling consistent
- Mobile-first approach

### Naming Conventions
- **Components**: PascalCase (e.g., `NewsDetector.tsx`)
- **Functions**: camelCase (e.g., `analyzeNews()`)
- **Variables**: camelCase (e.g., `credibilityScore`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)

## Commit Messages

Use clear, descriptive commit messages:

```
feat: add new feature
fix: fix a bug
docs: update documentation
style: formatting and code style changes
refactor: code refactoring
test: add or update tests
chore: maintenance tasks
```

Example:
```
feat: add credibility score filtering to news detector

- Implement score-based filtering
- Add UI controls for threshold selection
- Update API documentation
- Add tests for filtering logic
```

## Documentation

- Update `README.md` for major changes
- Add JSDoc comments to functions
- Update API documentation in OpenAPI spec
- Add examples for new features

## Testing

- Write tests for new features
- Ensure all existing tests pass
- Aim for high code coverage
- Test edge cases and error scenarios

## Performance

- Optimize component re-renders
- Minimize bundle size
- Use code splitting where appropriate
- Cache API responses when possible

## Security

- Never commit secrets or API keys
- Validate all user input
- Follow security guidelines in `SECURITY.md`
- Report vulnerabilities responsibly

## Questions?

- Check existing documentation
- Look at closed issues for answers
- Open a discussion or issue
- Contact maintainers

## License

By contributing to TruthMatrix, you agree that your contributions will be licensed under its MIT License.

## Recognition

Contributors will be recognized in:
- README.md
- GitHub contributors page
- Release notes (for significant contributions)

Thank you for contributing to TruthMatrix! 🎉
