const BlogData = [
    {
      id: 1,
      authorName: "John Doe",
      blogImg:
        "https://images.unsplash.com/photo-1597733336794-12d05021d510?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRlY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      blogTitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, laborum!",
      blogContent: `<p>How can you ensure your codebase consistently adheres to coding guidelines and remains error-free? The answer lies in implementing a robust set of tests and performing multiple checks for linting and type errors.</p>
      
      <p>While this may seem like a straightforward solution, achieving it requires some adjustments to streamline the developer experience (DX) and maintain high productivity.</p>
      
      <h2>Goal: Balancing Code Quality and Developer Freedom</h2>
      
      <p>The primary goal is to establish a rapid feedback loop for developers. This enables them to experiment, iterate, and make quick progress without the burden of strict coding guidelines.</p>
      
      <p>However, it's important to strike a balance. While we aim to enforce coding standards and ensure error-free code in production, we want to achieve this without slowing down developers or hindering their creativity.</p>
      
      <h2>Previous Workflow: A Bottleneck in Development</h2>
      
      <p>In the past, our workflow involved running various checks on developers' local machines using pre-commit hooks. These checks included enforcing coding standards, formatting commit messages, and other validations.</p>
      ESLint is crucial for enforcing coding standards and maintaining consistency. It also covers import order and accessibility checks. For running lint checks on relevant files, the command is:</p>
      
      <pre>
      eslint . --fix --ext .js,.jsx,.ts,.tsx
      </pre>
      
      <p>Our ESLint setup involves a variety of plugins:</p>
      
      <pre>
      {
        "eslint": "^7.24.0",
        "eslint-config-airbnb": "^18.2.1",
        "eslint-config-airbnb-base": "^14.2.1",
        "eslint-config-next": "13.0.5",
        "eslint-config-prettier": "^8.3.0",
        "eslint-import-resolver-typescript": "^2.4.0",
        "eslint-plugin-cypress": "^2.11.3",
        "eslint-plugin-import": "^2.22.1",
        "eslint-plugin-jsx-a11y": "^6.4.1",
        "eslint-plugin-prettier": "^3.4.0",
        "eslint-plugin-react": "^7.23.2",
        "eslint-plugin-react-hooks": "^4.2.0",
        "@typescript-eslint/eslint-plugin": "^5.39.0"
      }
      </pre>
      
      <p>By fine-tuning our development workflow, we've managed to strike a balance between maintaining code quality and empowering developers. This approach not only ensures robust code but also accelerates our deployment through efficient CI checks.</p>
      `,
      // blogLink: "https://example.com/intro-to-react",
    },
    {
      id: 2,
      authorName: "Darsh Aswani",
      blogImg:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      blogTitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, laborum!",
      blogContent: `
          <p>This is the content of the blog post about topic 2.</p>
          <p>Etiam vehicula arcu ac cursus. Morbi vitae tristique justo. Sed id ligula arcu. Fusce lacinia varius ligula, nec consequat libero vulputate in. Quisque tincidunt ut lorem nec luctus. Proin non lorem ut quam tempor consequat. Vivamus id venenatis lorem. Sed in justo eget libero volutpat facilisis. Aenean vel dolor vestibulum, blandit elit vitae, vestibulum est. Duis malesuada, sapien at laoreet gravida, odio justo varius enim, nec sollicitudin elit elit in purus. Etiam facilisis est id tellus semper malesuada. Etiam et leo diam. Nam sed euismod nisl. Aliquam erat volutpat. Fusce interdum vestibulum facilisis.</p>
        `,
      // blogLink: "https://example.com/intro-to-react",
    },
    {
      id: 3,
      authorName: "Bhargav Solanki",
      blogImg:
        "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRlY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      blogTitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, laborum!",
      blogContent: `
          <p>This is the content of the blog post about topic 1.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt purus ac justo lacinia tempus. Sed non purus tincidunt, posuere orci vel, tristique tortor. Fusce elementum blandit tellus, ac iaculis tellus finibus a. Duis facilisis risus nec nisi scelerisque, non facilisis leo dictum. In hac habitasse platea dictumst. Pellentesque dictum metus id dui feugiat tristique. Praesent eu eros eget velit ultricies rhoncus at vel sapien. Quisque euismod congue ligula eget facilisis. Maecenas vel dolor non velit faucibus hendrerit id eu ipsum. Duis efficitur tellus sit amet metus facilisis elementum. Integer non felis sit amet orci sodales dignissim nec et orci. Praesent venenatis, libero id mattis venenatis, quam odio ultrices lectus, nec scelerisque lorem odio et lectus.</p>
        `,
      // blogLink: "https://example.com/intro-to-react",
    },
    {
      id: 4,
      authorName: "Ronak Bhalgami",
      blogImg:
        "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRlY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      blogTitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, laborum!",
      blogContent: `
          <p>This is the content of the blog post about topic 1.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt purus ac justo lacinia tempus. Sed non purus tincidunt, posuere orci vel, tristique tortor. Fusce elementum blandit tellus, ac iaculis tellus finibus a. Duis facilisis risus nec nisi scelerisque, non facilisis leo dictum. In hac habitasse platea dictumst. Pellentesque dictum metus id dui feugiat tristique. Praesent eu eros eget velit ultricies rhoncus at vel sapien. Quisque euismod congue ligula eget facilisis. Maecenas vel dolor non velit faucibus hendrerit id eu ipsum. Duis efficitur tellus sit amet metus facilisis elementum. Integer non felis sit amet orci sodales dignissim nec et orci. Praesent venenatis, libero id mattis venenatis, quam odio ultrices lectus, nec scelerisque lorem odio et lectus.</p>
        `,
      // blogLink: "https://example.com/intro-to-react",
    },
    {
      id: 5,
      authorName: "Shivam Ardeshna",
      blogImg:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRlY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      blogTitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, laborum!",
      blogContent: `
          <p>This is the content of the blog post about topic 1.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt purus ac justo lacinia tempus. Sed non purus tincidunt, posuere orci vel, tristique tortor. Fusce elementum blandit tellus, ac iaculis tellus finibus a. Duis facilisis risus nec nisi scelerisque, non facilisis leo dictum. In hac habitasse platea dictumst. Pellentesque dictum metus id dui feugiat tristique. Praesent eu eros eget velit ultricies rhoncus at vel sapien. Quisque euismod congue ligula eget facilisis. Maecenas vel dolor non velit faucibus hendrerit id eu ipsum. Duis efficitur tellus sit amet metus facilisis elementum. Integer non felis sit amet orci sodales dignissim nec et orci. Praesent venenatis, libero id mattis venenatis, quam odio ultrices lectus, nec scelerisque lorem odio et lectus.</p>
        `,
      // blogLink: "https://example.com/intro-to-react",
    },
    {
      id: 6,
      authorName: "Rishikesh Chaudhari",
      blogImg:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      blogTitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, laborum!",
      blogContent: `
          <p>This is the content of the blog post about topic 1.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt purus ac justo lacinia tempus. Sed non purus tincidunt, posuere orci vel, tristique tortor. Fusce elementum blandit tellus, ac iaculis tellus finibus a. Duis facilisis risus nec nisi scelerisque, non facilisis leo dictum. In hac habitasse platea dictumst. Pellentesque dictum metus id dui feugiat tristique. Praesent eu eros eget velit ultricies rhoncus at vel sapien. Quisque euismod congue ligula eget facilisis. Maecenas vel dolor non velit faucibus hendrerit id eu ipsum. Duis efficitur tellus sit amet metus facilisis elementum. Integer non felis sit amet orci sodales dignissim nec et orci. Praesent venenatis, libero id mattis venenatis, quam odio ultrices lectus, nec scelerisque lorem odio et lectus.</p>
        `,
      // blogLink: "https://example.com/intro-to-react",
    },
    {
      id: 7,
      authorName: "Vasu Bhut",
      blogImg:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbXB1dGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      blogTitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, laborum!",
      blogContent: `
          <p>This is the content of the blog post about topic 1.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt purus ac justo lacinia tempus. Sed non purus tincidunt, posuere orci vel, tristique tortor. Fusce elementum blandit tellus, ac iaculis tellus finibus a. Duis facilisis risus nec nisi scelerisque, non facilisis leo dictum. In hac habitasse platea dictumst. Pellentesque dictum metus id dui feugiat tristique. Praesent eu eros eget velit ultricies rhoncus at vel sapien. Quisque euismod congue ligula eget facilisis. Maecenas vel dolor non velit faucibus hendrerit id eu ipsum. Duis efficitur tellus sit amet metus facilisis elementum. Integer non felis sit amet orci sodales dignissim nec et orci. Praesent venenatis, libero id mattis venenatis, quam odio ultrices lectus, nec scelerisque lorem odio et lectus.</p>
        `,
      // blogLink: "https://example.com/intro-to-react",
    },
    {
      id: 8,
      authorName: "Karan Ribadiya",
      blogImg:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvbXB1dGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      blogTitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, laborum!",
      blogContent: `
          <p>This is the content of the blog post about topic 1.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt purus ac justo lacinia tempus. Sed non purus tincidunt, posuere orci vel, tristique tortor. Fusce elementum blandit tellus, ac iaculis tellus finibus a. Duis facilisis risus nec nisi scelerisque, non facilisis leo dictum. In hac habitasse platea dictumst. Pellentesque dictum metus id dui feugiat tristique. Praesent eu eros eget velit ultricies rhoncus at vel sapien. Quisque euismod congue ligula eget facilisis. Maecenas vel dolor non velit faucibus hendrerit id eu ipsum. Duis efficitur tellus sit amet metus facilisis elementum. Integer non felis sit amet orci sodales dignissim nec et orci. Praesent venenatis, libero id mattis venenatis, quam odio ultrices lectus, nec scelerisque lorem odio et lectus.</p>
        `,
      // blogLink: "https://example.com/intro-to-react",
    },
    {
      id: 9,
      authorName: "Samarth Otiya",
      blogImg:
        "https://images.unsplash.com/photo-1529236183275-4fdcf2bc987e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGNvbXB1dGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      blogTitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, laborum!",
      blogContent: `
          <p>This is the content of the blog post about topic 1.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt purus ac justo lacinia tempus. Sed non purus tincidunt, posuere orci vel, tristique tortor. Fusce elementum blandit tellus, ac iaculis tellus finibus a. Duis facilisis risus nec nisi scelerisque, non facilisis leo dictum. In hac habitasse platea dictumst. Pellentesque dictum metus id dui feugiat tristique. Praesent eu eros eget velit ultricies rhoncus at vel sapien. Quisque euismod congue ligula eget facilisis. Maecenas vel dolor non velit faucibus hendrerit id eu ipsum. Duis efficitur tellus sit amet metus facilisis elementum. Integer non felis sit amet orci sodales dignissim nec et orci. Praesent venenatis, libero id mattis venenatis, quam odio ultrices lectus, nec scelerisque lorem odio et lectus.</p>
        `,
      // blogLink: "https://example.com/intro-to-react",
    },
    {
      id: 10,
      authorName: "Robert Downey JR.",
      blogImg:
        "https://images.unsplash.com/flagged/photo-1569144654912-5f146d08b98b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGNvbXB1dGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      blogTitle: "Lorem ipsum dolor sit ",
      blogContent: `
          <p>This is the content of the blog post about topic 1.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt purus ac justo lacinia tempus. Sed non purus tincidunt, posuere orci vel, tristique tortor. Fusce elementum blandit tellus, ac iaculis tellus finibus a. Duis facilisis risus nec nisi scelerisque, non facilisis leo dictum. In hac habitasse platea dictumst. Pellentesque dictum metus id dui feugiat tristique. Praesent eu eros eget velit ultricies rhoncus at vel sapien. Quisque euismod congue ligula eget facilisis. Maecenas vel dolor non velit faucibus hendrerit id eu ipsum. Duis efficitur tellus sit amet metus facilisis elementum. Integer non felis sit amet orci sodales dignissim nec et orci. Praesent venenatis, libero id mattis venenatis, quam odio ultrices lectus, nec scelerisque lorem odio et lectus.</p>
        `,
      // blogLink: "https://example.com/intro-to-react",
    },
    // Add more entries as needed
  ];
  
  export default BlogData;
  