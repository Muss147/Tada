import { organization } from "better-auth/plugins";

export default {
  common: {
    search: {
      placeholder: "Search...",
    },
    dateRange: {
      default: "Jan 6, 2024 - Jan 13, 2024",
    },
    language: "Language",
    success: "Success",
    currency: "Currency",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    update: "Update",
    updateConfig: "Update config",
    add: "Add",
    loading: "Loading...",
    close: "Close",
    all: "All",
    choose: "Choose",
    upgrade: "Upgrade",
    popular: "Most popular",
    unlimited: "Unlimited",
    month: "month",
    year: "year",
    waitPlease: "Please wait",
    continue: "Continue",
    next: "Next",
    contactUs: "Talk to us",
    loadingOverlay: {
      title: "Loading mission...",
      subtitle: "Please wait while we prepare your content",
    },

    or: "Or",
    error: {
      somethingWentWrong: "Something went wrong",
      tryAgain: "Try again",
    },
    noResults: {
      title: "No results",
      noItems: "No items have been created yet.",
      withFilters: "Try a different search or adjust the filters.",
      clearFilters: "Clear filters",
    },
  },
  billing: {
    success: {
      title: "Payment Successful!",
      subscriptionActivated: "Subscription activated successfully 🎉",
    },
    error: {
      title: "Error",
    },
    errors: {
      missingSessionId: "Missing session ID.",
      generalError: "An error occurred.",
      sessionRetrievalError: "Error retrieving session.",
    },
    loading: {
      verifyingPayment: "Verifying your payment...",
    },
    invoice: {
      title: "Invoice",
      number: "Number",
      viewOnline: "View online",
      downloadPdf: "Download PDF",
    },
    actions: {
      backToPricing: "Back to pricing",
      continueToDashboard: "Continue to dashboard",
    },
  },
  invoices: {
    title: "My Invoices",
    total: "{count} invoice(s)",
    paidOn: "Paid on",
    loading: {
      fetchingInvoices: "Loading invoices...",
    },
    error: {
      title: "Loading error",
    },
    errors: {
      fetchError: "Unable to load invoices.",
    },
    empty: {
      title: "No invoices",
      description: "You don't have any invoices yet.",
    },
    status: {
      paid: "Paid",
      open: "Pending",
      void: "Cancelled",
      uncollectible: "Unpaid",
      draft: "Draft",
    },
    actions: {
      view: "View",
      download: "Download",
      retry: "Retry",
      loadMore: "Load more",
      loading: "Loading...",
    },
  },
  support: {
    title: "Support",
    description: "Please fill out the form below to submit a support request.",
    subject: "Subject",
    priority: "Severity",
    selectSeverity: "Select severity",
    low: "Low",
    normal: "Normal",
    high: "High",
    urgent: "Urgent",
    message: "Message",
    messagePlaceholder:
      "Describe the issue you're facing, along with any relevant information. Please be as detailed and specific as possible.",
    product: "Product",
    selectProduct: "Select product",
    subjectPlaceholder: "Summary of the problem you have",
    submit: "Submit",
    mission: "Mission",
    marketBeats: "Market Beats",
    general: "General",
    messageSent: "Support ticket sent.",
    messageError: "Something went wrong please try again.",
  },
  export: {
    errors: {
      missingId: "Missing mission ID",
      notFound: "Mission not found",
    },
    columns: {
      mission: "Mission",
      problemSummary: "Problem Summary",
      objectives: "Objectives",
      assumptions: "Assumptions",
      organization: "Organization",
      questionnaire: "Questionnaire",
      responseId: "Response ID",
      age: "Age",
      gender: "Gender",
      ipAddress: "IP Address",
      userAgent: "User Agent",
      submittedAt: "Submitted At",
      status: "Status",
    },
  },
  header: {
    credits: "Credits",
    billingAddressTitle: "Enter billing address",
    billingAddressInfo:
      "You need to enter your billing address to buy credits.",
    street: "Street name and number",
    postalCode: "Postal Code",
    city: "City",
    country: "Country",
    company: "Company",
    latestUpdates: "Latest Updates",
    improved: "IMPROVED",
    new: "NEW",
    aiInsightsTitle: "AI insights for multiple questions at once",
    aiInsightsDesc:
      "Adding AI insights to your results board just got a whole lot easier. You can now select...",
    pValuesTitle: "View non-significant P-values in significance testing",
    pValuesDesc:
      "You can now choose to view all P-values in your significance visualizations, critically...",
    filterMatchingTitle: "Intelligent filter matching when creating surveys",
    filterMatchingDesc:
      "Tired of manually repeating the same filter logic for every answer option in your surveys...",
    poweredBy: "Powered by Canny • RSS",
    seeAllChanges: "See all changes",
  },
  creditsModal: {
    title: "Add Credits",
    approvedBy: "Appreciated and approved by over 2000 teams",
    researchAsYouGo: {
      title: "As you go",
      price: "1.50€/Credit",
      creditCount: "Amount of credits",
      totalHT: "Total:",
    },
    plan: {
      maxMissions: "Max missions",
      maxUsers: "Max users",
      maxResponses: "Max responses",
      manageSubscription: "Manage subscription",
    },
    noPlan: {
      title: "No active plan",
      description: "You must subscribe to a plan first to continue.",
      seePricing: "See pricing",
    },
    starterPlan: {
      title: "Starter Plan",
      desc: "20,000 Credits / year",
      feature1: "Dedicated onboarding",
      feature2: "Up to 5 ad-hoc studies",
    },
    teamPlan: {
      title: "Team Plan",
      desc: "100,000 Credits / year",
      feature1: "Customer success expert",
      feature2: "Up to 12 ad-hoc studies",
    },
    businessPlan: {
      title: "Business Plan",
      desc: "275,000 Credits / year",
      feature1: "Customer success expert",
      feature2: "Up to 36 ad-hoc studies",
      feature3: "Full-service research",
    },
  },
  paymentModal: {
    title: "Order Summary",
    summarySection: {
      title: "Summary",
      creditsLabel: "Appinio 'Research as you go' Credits",
      pricePerCredit: "Price per credit:",
      totalHT: "Total excl. VAT:",
      disclaimer:
        "Acceptance of terms and conditions is mandatory. By clicking 'Buy', you agree to pay the stated amount. Credits are valid for a period of 12 months from the date of purchase. All prices are exclusive of tax.",
      gdpr: "GDPR Compliant",
      ssl: "SSL Secure Encryption",
      capterra: "Rated 4.9 on Capterra",
    },
    paymentSuccess: "Paiement réussi ! Vos crédits ont été ajoutés.",
    paymentMethodSection: {
      title: "Payment Method",
      invoice: "Pay by invoice",
      payWith: "Pay with",
    },
    form: {
      civility: "Civility",
      firstName: "First Name",
      lastName: "Last Name",
      streetNumber: "Street name and number",
      postalCode: "Postal Code",
      city: "City",
      country: "Country",
      company: "Company",
      acceptTerms: "I accept the",
      termsAndConditions: "Terms and conditions",
    },
    buyCreditsButton: "Buy {credits} credits",
  },
  countries: {
    germany: "Germany",
    france: "France",
    spain: "Spain",
    uk: "United Kingdom",
    usa: "USA",
    ivoryCoast: "Côte d'Ivoire",
  },
  form: {
    civility: {
      mr: "Mr.",
      mrs: "Mrs.",
    },
  },
  studies: {
    title: "Studies conducted by Tada",
    searchPlaceholder: "Search for a study...",
    typeSelector: {
      placeholder: "Study Type",
      allTypes: "All Types",
      hypeTrain: "Hype Train",
      hypeTracker: "Hype Tracker",
      reports: "Reports",
    },
    subscription: {
      freeVersion: "Free Version",
      freeDescription:
        "You can consult up to {count} super admin missions with your current plan.",
      limitReached: "Mission Limit Reached",
      limitDescription:
        "You have consulted {current} out of {max} available missions for your current plan.",
    },
    navigation: {
      hypeTrain: "Hype Train",
      cooperation: "Cooperation",
      reports: "Reports",
      all: "All",
    },
    card: {
      premium: "Premium",
      loadingStudy: "Loading study...",
    },
  },
  upgrade: {
    plans: {
      priceFormat: "{price}/{interval}",
      unlimitedStudies: "Unlimited Missions",
      studiesPerMonth: "{count} missions per month",
      upgradeButton: "Mettre à niveau",
    },
    modal: {
      close: "Close",
      title: "Limited Access",
      description:
        'The mission "{studyTitle}" requires a higher subscription. Your current plan allows you to view {count} missions. Please upgrade your subscription to access more content.',
    },
  },
  errors: {
    consultMission: "Failed to consult super admin mission.",
    loadingSubscription: "Error loading subscription",
    loadingPlans: "Unable to load plans",
    createCheckout: "Unable to create payment session",
    accessStudy: "Unable to access study",
    unexpectedError: "An unexpected error occurred",
  },
  navigation: {
    home: "Home",
    cards: "Cards",
    orders: "Orders",
    settings: "Settings",
    missions: "Projects",
    templatesSurveys: "Templates surveys",
    workspace: "Workspace",
    explore: "Explore",
    knowledge: "Knowledge",
    dashboard: "Dashboard",
    projects: "Projects",
    multiprojects: "Multiprojects",
    templates: "Templates",
    marketBeats: "Market Beats",
    help: "Help center",
    analysis: "AI Analysis",
    contactUs: "Contact us",
    userManagement: "User management",
  },
  user: {
    menu: {
      title: "My Account",
      profile: "Profile",
      settings: "Settings",
      pricings: "Pricings",
      signOut: "Sign out",
      support: "Support",
    },
  },
  welcome: "Hello {name}!",
  auth: {
    login: {
      title: "Unlock Real-Time Data for Better Decisions — Anytime, Anywhere.",
      testimonial: {
        quote1:
          "80% of professionals find market research intimidating, boring, and overpriced. The other 20% are already with us.",
        quote2:
          "No matter your industry or mission, Tada equips you with the intelligence that drives real impact.",
        quote3:
          "Our customizable data solutions help you solve your most critical challenges—faster, smarter, and at scale.",
        author: {
          name: "Thomas Dubois",
          role: "Portfolio Director, AHL Partners",
        },
      },
      welcomeBack: "Welcome back",
      rememberMe: "Remember me",
      trustedBy: "Trusted by Global Leaders Across Industries",
      description: "Sign in to your account to continue.",
      email: "Email",
      password: "Password",
      submit: "Sign in",
      loading: "Signing in...",
      orSignInWith: "Or sign in with:",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      google: "Continue with Google",
      apple: "Apple",
      forgotPassword: "Forgot password ?",
      emailVerified: {
        title: "Email verified",
        description:
          "Your email has been verified successfully. You can now log in.",
      },
    },
    signup: {
      title: "Create an account",
      description: "Sign up to get started with Tada.",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      submit: "Sign up",
      loading: "Creating account...",
      orSignUpWith: "Or sign up with",
      haveAccount: "Already have an account?",
      signIn: "Sign in",
      google: "Google",
      apple: "Apple",
      name: "Name",
      organizationName: "Organization name",
    },
    verifyEmail: {
      title: "Check your email",
      description: "We've sent you a confirmation link by email",
      checkEmail: "Check your inbox and click the confirmation link",
      backToSignIn: "Back to sign in",
    },
    forgotPassword: {
      title: "Reset your password",
      description: "Enter your email to receive a reset link.",
      email: "Email",
      submit: "Send reset link",
      loading: "Sending...",
      backToLogin: "Back to login",
      success: "A reset email has been sent.",
      error: "An error occurred. Please try again.",
    },
    resetPassword: {
      title: "Reset your password",
      description: "Enter your new password below",
      newPassword: "New password",
      confirmPassword: "Confirm password",
      passwordPlaceholder: "Enter your new password",
      confirmPasswordPlaceholder: "Confirm your new password",
      submit: "Reset password",
      backToSignIn: "Back to sign in",
      success: "Password has been reset successfully",
      errors: {
        invalidToken: "Invalid or expired reset link",
        tokenExpired: "This password reset link has expired",
        failed: "Failed to reset password. Please try again.",
      },
      requestNewLink: "Request a new reset link",
    },
    validation: {
      email: {
        required: "Email is required",
        invalid: "Invalid email address",
      },
      password: {
        required: "Password is required",
        minLength: "Password must be at least 8 characters",
        pattern:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      },
      confirmPassword: {
        required: "Please confirm your password",
        match: "Passwords do not match",
      },
      name: {
        required: "Name is required",
      },
      organizationName: {
        required: "Organization name is required",
      },
    },
  },
  settings: {
    tabs: {
      profile: "Profile",
      password: "Password",
      users: "Users",
      organizations: "Organization",
    },
    personalInfo: {
      title: "Personal Information",
      description: "Update your personal information",
      name: "Full Name",
      email: "Email Address",
      position: "Job Title",
      country: "Country of Residence",
      sector: "Business Sector",
      avatar: "Your Avatar",
      avatarDescription: "This will be displayed on your profile",
      uploadText: "Click to upload",
      dragAndDrop: "or drag and drop",
      fileTypes: "SVG, PNG, JPG or GIF (max. 800x400px)",
      selectCountry: "Select a country",
      selectSector: "Select a sector",
      success: "Personal information updated successfully",
      error: "Failed to update personal information",
      firstName: "First Name",
      lastName: "Last Name",
      sectors: {
        education: "Education",
        technology: "Technology",
        healthcare: "Healthcare",
        finance: "Finance",
        other: "Other",
      },
      validation: {
        name: {
          required: "Name is required",
          tooShort: "Name must be at least 2 characters",
        },
        email: {
          required: "Email is required",
          invalid: "Invalid email address",
        },
        position: {
          required: "Position is required",
          tooShort: "Position must be at least 2 characters",
        },
        country: {
          required: "Please select a country",
        },
        sector: {
          required: "Please select a sector",
        },
      },
    },
    title: "Settings",
    profile: {
      meta: {
        title: "Profile",
      },
    },
    password: {
      title: "Password",
      description: "Please enter your current password to change it.",
      current: "Current password",
      new: "New password",
      confirm: "Confirm password",
      hint: "Your password must be at least 8 characters long",
      success: "Your password has been successfully changed",
      error: "An error occurred while changing your password",
      validation: {
        currentRequired: "Current password is required",
        newRequired: "New password is required",
        confirmRequired: "Password confirmation is required",
        tooShort: "Password must be at least 8 characters long",
        noMatch: "Passwords do not match",
      },
    },
  },
  teamMembers: {
    invite: {
      title: "Invite members",
      emailPlaceholder: "you@example.com",
      selectRolePlaceholder: "Select a role",
      submit: "Invite",
      delete: {
        title: "Delete member",
        description: "The member has been deleted successfully",
      },
      roles: {
        admin: "Administrator",
        member: "Member",
        owner: "Owner",
        viewer: "Viewer",
      },
      success: {
        title: "Invitation sent",
        description: "An invitation email has been sent to {email}",
      },
      error: {
        title: "Invitation error",
        description: "An error occurred while sending the invitation",
      },
    },
    current: {
      title: "Current members",
      description: "Manage your existing team and modify roles/permissions.",
      columns: {
        name: "Name",
        role: "Role",
        actions: "Actions",
      },
      actions: {
        delete: "Delete",
        edit: "Edit",
      },
    },
    organization: {
      title: "Organization's settings",
      description: "Manage your organization.",
      namePlaceholder: "Organization name",
      submit: "Update",
      sector: "Activity Sector",
      sectorPlaceholder: "Select a sector",
      country: "Country",
      countryPlaceholder: "Select a country",
      edit: {
        missingId: "Organization ID is missing",
        success: {
          title: "Organization updated",
          description: "{name}'s name has been updated to {newName}.",
        },
        error: {
          title: "Error",
          description: "An error occurred while updating the organization.",
        },
      },
      avatar: {
        title: "Profile Picture",
        description:
          "Upload and manage your profile avatar. This will be visible to other team members.",
        upload: {
          button: "Click to upload",
          formats: "SVG, PNG, JPG or GIF (max. 800x400px)",
          maxSize: "Maximum file size: 5MB",
        },
      },
      name: {
        title: "Organization name",
        description:
          "Manage your organization name and settings. This will be visible across your workspace.",
        label: "Organization Name",
        placeholder: "Enter your organization name",
        save: "Save Changes",
        saving: "Saving...",
      },
    },
    edit: {
      title: "Edit {name}'s role",
      selectRolePlaceholder: "Select a new role",
      success: {
        title: "Role updated",
        description: "{name}'s role has been changed to {role}",
      },
      error: {
        title: "Error",
        description: "An error occurred while updating the role",
      },
    },
  },
  invitation: {
    title: "Team Invitation",
    description: "You have been invited to join {organization} by {inviter}",
    accept: "Accept Invitation",
    decline: "Decline",
    backToLogin: "Back to Login",
    errors: {
      notFound: "This invitation doesn't exist or has expired",
      invalid: "This invitation is not valid",
      acceptFailed: "Failed to accept invitation",
    },
    success: {
      title: "Invitation Accepted",
      description: "You have successfully joined {organization}",
    },
    error: {
      title: "Error",
      description: "An error occurred while accepting the invitation",
    },
    createAndAccept: "Create account & accept",
    signInAndAccept: "Sign in & accept",
    alreadyHaveAccount: "Already have an account? Sign in",
    needAccount: "Need an account? Sign up",
  },
  organization: {
    setup: {
      title: "Setup your workspace",
      description: "Create your organization or join an existing one",
      create: {
        title: "Create a new organization",
        namePlaceholder: "Your organization name",
        submit: "Create organization",
      },
      join: {
        title: "Join an existing organization",
        submit: "Use an invitation",
      },
    },
    created: {
      title: "Organization created",
      description: "Your organization has been created successfully",
    },
    error: {
      title: "Error",
      description: "An error occurred while creating the organization",
    },
    join: {
      title: "Join an organization",
      needInvitation: "Ask your company to invite you to join their workspace",
    },
  },
  missions: {
    duplicate: {
      success: "Mission duplicated successfully",
      error: "An error occurred while duplicating the mission",
      redirect: "Redirecting to the duplicated mission...",
      descriptionSuccess: "The mission has been duplicated successfully",
      descriptionError: "An error occurred while duplicating the mission",
    },
    errors: {
      notFound: "Mission not found",
    },
    update: {
      alreadyPending: "A modification is already pending validation",
      submittedForReview: "Mission updated and submitted for validation",
      genericError: "Error while updating mission",
      editTooSoon: "Modification not allowed. Please wait the next month.",
    },
    navigation: {
      overview: "Overview",
      dashboards: "Dashboard",
      submissions: "Submissions",
      edit: "Edit mission",
      delete: "Delete mission",
    },
    overview: {
      title: "Sub Dashboard",
      miniDashboardTitle: "No surveys found.",
      noSurvey: "No surveys found.",
      addSubDash: "Add a sub dashboard",
      tableColumns: {
        name: "Name",
        status: "Status",
        author: "Author",
        email: "Email",
        createdAt: "Date",
      },
    },
    createSurveyModal: {
      createButton: "Create New Survey",
      title: "Create New Survey",
      loading: "Loading...",
      ai: {
        title: "From AI",
        feature1: "Custom questionnaire",
        feature2: "Bespoke target audience",
        description:
          "Unlimited questions, custom audiences, 20+ question types & advanced survey features",
      },
      template: {
        title: "From template",
        feature1: "1–3 Questions",
        feature2: "Nationally representative",
        description:
          "Cost-effective surveys with up to three questions & nationally representative sample",
      },
      upload: {
        title: "Upload a survey",
        feature1: "Free in yearly plan packages",
        feature2: "Your own target audience",
        description:
          "Collect opinions from your own community or audience, through your own channels.",
      },
      manuel: {
        title: "Create manually",
        feature1: "Custom questionnaire",
        feature2: "Bespoke target audience",
        description:
          "Unlimited questions, custom audiences, 20+ question types & advanced survey features",
      },
    },
    addSubDashboard: {
      title: "Add Sub Dashboard",
      notFound: {
        title: "Mission not found",
        description:
          "The mission you are looking for does not exist or may have been removed.",
        backToMission: "Back to missions",
      },
      form: {
        nameLabel: "Name",
        namePlaceholder: "Enter the name",
        visibilityLabel: "Share this dashboard",
        visibilityDescription:
          "This dashboard will be visible to all members of your organization.",
        cancelButton: "Cancel",
        addButton: "Add",
        submittingButton: "Adding...",
      },
      validation: {
        nameMin: "Minimum 3 characters",
        nameMax: "Maximum 50 characters",
        typeRequired: "Type is required",
      },
      imageViewer: {
        title: "Image Viewer",
        reset: "Reset",
        doubleClickHint: "Double-click on the image to reset zoom",
      },
      imageItem: {
        editMode: "Edit image",
        viewMode: "Image preview",
        preview: "Preview:",
        selectImage: "Select an image",
        dragDropText: "Drag and drop or click to browse",
        fileFormats: "PNG, JPG, GIF up to 10MB",
        saving: "Saving...",
        save: "Save",
        cancel: "Cancel",
        deleteTitle: "Delete image",
        deleteMessage: "Do you want to delete this image?",
        deleteConfirm: "Yes",
        deleteCancel: "No",
        deleting: "Deleting...",
        updateSuccess: "Image updated",
        updateSuccessDescription: "The image has been updated successfully.",
        error: "Error",
        updateErrorDescription: "An error occurred while updating the image.",
        altText: "Dashboard image",
      },
      textItem: {
        editMode: "Edit text",
        placeholder: "Enter your text here",
        saving: "Saving...",
        save: "Save",
        cancel: "Cancel",
        deleteTitle: "Delete text",
        deleteMessage: "Do you want to delete this text?",
        deleteConfirm: "Yes",
        deleteCancel: "No",
        deleting: "Deleting...",
        updateSuccess: "Text updated",
        updateSuccessDescription: "The text has been updated successfully.",
        error: "Error",
        updateErrorDescription: "An error occurred while updating the text.",
      },
      surveyItem: {
        editMode: "Edit survey",
        placeholder: "Enter your survey question here",
        saving: "Saving...",
        save: "Save",
        cancel: "Cancel",
        deleteTitle: "Delete survey",
        deleteMessage: "Do you want to delete this survey?",
        deleteConfirm: "Yes",
        deleteCancel: "No",
        deleting: "Deleting...",
        updateSuccess: "Survey updated",
        updateSuccessDescription: "The survey has been updated successfully.",
        error: "Error",
        updateErrorDescription: "An error occurred while updating the survey.",
        export: "Export survey",
        share: "Share survey",
        comments: "Comments",
        exportCsv: "Export as CSV",
        exportPdf: "Export as PDF",
        exportPng: "Export as PNG",
        exportPpt: "Export as PowerPoint",
        viewComments: "View comments",
        copyRawData: "Copy raw data",
        copyPublicLink: "Copy public link",
      },
      empty: {
        title: "Your dashboard is empty",
        subtitle: "Start by adding items to your sub dashboard",
      },
      item: {
        title: "Add an item",
        text: {
          title: "Text",
          description: "Add textual content",
        },
        image: {
          title: "Image",
          description: "Add an image",
        },
        survey: {
          title: "Survey",
          description: "Embed a questionnaire",
        },
      },
      questionnaireEditor: {
        title: "Questionnaire Editor",
        editMode: "Edit questionnaire",
        viewMode: "Questionnaire preview",
        addQuestion: "Add question",
        questionTypes: {
          text: "Short text",
          comment: "Long text",
          radiogroup: "Single choice",
          checkbox: "Multiple choice",
          dropdown: "Dropdown",
          rating: "Rating",
          boolean: "Yes/No",
          file: "File upload",
          matrix: "Matrix",
          ranking: "Ranking",
          imagepicker: "Image picker",
          html: "HTML content",
        },
        questionSettings: {
          title: "Question title",
          titlePlaceholder: "Enter your question title",
          description: "Description (optional)",
          descriptionPlaceholder: "Add a description to clarify the question",
          required: "Required question",
          choices: "Available choices",
          addChoice: "Add choice",
          choicePlaceholder: "New choice",
          ratingScale: "Rating scale",
          minRating: "Minimum rating",
          maxRating: "Maximum rating",
          minLabel: "Minimum label",
          maxLabel: "Maximum label",
          fileTypes: "Accepted file types",
          maxFileSize: "Maximum size (MB)",
          multipleFiles: "Multiple files",
          htmlContent: "HTML content",
        },
        actions: {
          save: "Save",
          saving: "Saving...",
          cancel: "Cancel",
          delete: "Delete",
          preview: "Preview",
          addQuestion: "Add question",
          moveUp: "Move up",
          moveDown: "Move down",
          duplicate: "Duplicate",
        },
        messages: {
          deleteConfirm: "Are you sure you want to delete this question?",
          deleteQuestionnaireConfirm:
            "Are you sure you want to delete this survey?",
          noQuestions: "No questions added",
          noQuestionsDescription: "Start by adding your first question",
          updateSuccess: "Survey updated",
          updateSuccessDescription: "The survey has been updated successfully.",
          error: "Error",
          updateErrorDescription: "An error occurred while updating.",
        },
        preview: {
          title: "Survey preview",
          sampleData: "Sample data",
          responses: "responses collected",
          lastUpdated: "Last updated",
        },
      },
      createSubDashboardState: {
        success: "Sub dashboard added successfully",
        error: "An error occurred while creating the sub dashboard",
      },
      create: {
        success: "Item added successfully",
        error: "An error occurred while adding the item",
      },
      update: {
        success: "Item updated successfully",
        error: "An error occurred while updating the item",
      },
      delete: {
        success: "Item deleted successfully",
        error: "An error occurred while deleting the item",
      },
    },
    updated: "Mission updated successfully",
    updatedError: "An error occurred while updating the mission",
    updatedDescription: "Mission updated successfully",
    updatedErrorDescription: "An error occurred while updating the mission",
    status: {
      live: "Live",
      complete: "Complete",
      paused: "Paused",
      cancelled: "Cancelled",
      draft: "Draft",
      all: "All tasks",
      "on hold": "On hold",
      on_hold: "On hold",
    },
    filter: {
      title: "Filter projects :",
      add: "Add a project",
    },
    completion: "{percentage}% completed",
    submissions: "{submissions} submissions",
    updated_type: {
      form: "Changes were made to the form",
      audience: "Changes were made to the audience",
      objective: "Changes were made to the objective",
      assumptions: "Changes were made to the assumptions",
      problem: "Changes were made to the problem",
      solution: "Changes were made to the solution",
    },
    ai: {
      tipsAiCard: {
        intro: "Here are some tips for using this tool effectively:",
        provide: "Provide",
        provideDetail: "as much information as possible for a better brief.",
        askMe: "Don't hesitate",
        askMeDetail:
          "Don't hesitate to ask for clarifications, I'm here to explain.",
        youCanChange: "Edit",
        youCanChangeDetail:
          "the brief at any time using the edit button if necessary.",
      },
    },
    createMission: {
      filedFilled: "Fields filled(...)",
      form: {
        researchMarket: "Research a market",
        filterAudiences: "Filter audiences",
        problemSummary: "Problem statement",
        strategicGoal: "Strategic goal",
        assumptions:
          "Potential hypotheses to investigate- select those you think are most relevant",
        audiences: "Target audiences/markets",
        name: "Name of the mission",
        placeholder: "Answer questions in the chat to generate this section",
        surveys: "Surveys",
        success: "Mission created successfully",
        error: "An error occurred while creating the mission",
        showSurveys: "Show surveys",
      },
    },
    missionSubmission: {
      title: "Answers",
      noData: {
        title: "No responses",
        description: "No responses available at the moment",
      },
      tabs: {
        list: "List",
        map: "Map",
      },
      export: "Export",
    },
    progress: {
      title: "Progress",
      description: "Follow the progress of your mission",
      score: "Your brief score",
      rating:
        "Keep answering questions in the chat to improve the quality of your brief",
      empty: "Empty",
      great: "Great!",
      good: "Good",
      fair: "Fair",
      perfect: "Perfect!",
    },
    surveys: {
      title: "Survey questions",
      yourBrief: "Your brief",
      publishSurvey: "Submit",
      saveAfterSurvey: "Save before accessing the survey",
      saveDraft: "Save",
      saveDraftError: "An error occurred while saving the survey",
      saveDraftErrorDescription: "Please try again",
      saveDraftSuccess: "Survey saved successfully",
      saveDraftSuccessDescription: "The survey has been saved successfully",
      published: "Survey published",
      edited: "Survey edited",
      publishedDescription: "The survey has been published successfully",
      publishedError: "An error occurred while publishing the survey",
      publishedErrorDescription: "Please try again",
      addNewQuestion: {
        title: "Add New Question",
        searchPlaceholder: "Search question types...",
        searchPlaceholderAi: "Tell us what you want as a question...",
        generateQuestion: "Generate a question",
        backToTypes: "Back to question types",
        questionType: "Question Type",
        questionText: "Question Text",
        questionPlaceholder: "Enter your question here",
        options: "Options",
        addOption: "Add Option",
        ratingOptions: "Rating Options",
        minRating: "Minimum rating",
        maxRating: "Maximum rating",
        displayAsStars: "Display as stars",
        required: "Required",
        noResults: "No question types found matching the search",
        cancel: "Cancel",
        add: "Add",
        update: "Update",
        editQuestion: "Edit question",
        deleteQuestion: "Delete question",
      },
      questionCategories: {
        common: "Common",
        advanced: "Advanced",
        input: "Input",
        specialized: "Specialized",
        ai: "AI",
      },
      questionTypes: {
        text: {
          title: "Text",
          description: "Short text input question",
        },
        comment: {
          title: "Comment",
          description: "Multi-line text input",
        },
        checkbox: {
          title: "Checkbox",
          description: "Multiple choice question with checkboxes",
        },
        radiogroup: {
          title: "Radio Group",
          description: "Single choice question with radio buttons",
        },
        dropdown: {
          title: "Dropdown",
          description: "Single choice dropdown menu",
        },
        boolean: {
          title: "Boolean",
          description: "Yes/No question",
        },
        ranking: {
          title: "Ranking",
          description: "Rank items in order of preference",
        },
        rating: {
          title: "Rating",
          description: "Rate on a numeric scale",
        },
        imagepicker: {
          title: "Image Picker",
          description: "Choose from a set of images",
        },
        file: {
          title: "File Upload",
          description: "Upload a file",
        },
        date: {
          title: "Date",
          description: "Select a date",
        },
        datetime: {
          title: "Date & Time",
          description: "Select a date and time",
        },
        email: {
          title: "Email",
          description: "Enter an email address",
        },
        number: {
          title: "Number",
          description: "Enter a number",
        },
        phone: {
          title: "Phone",
          description: "Enter a phone number",
        },
        expression: {
          title: "Expression",
          description: "Calculate a value",
        },
        image: {
          title: "Image",
          description: "Display an image",
        },
        address: {
          title: "Address",
          description: "Enter an address",
        },
        multipletext: {
          title: "Multiple Text",
          description: "Multiple text input fields",
        },
        slider: {
          title: "Slider",
          description: "Select a value using a slider",
        },
        nps: {
          title: "NPS",
          description: "Net Promoter Score question",
        },
      },
    },
    templates: {
      title: "Templates surveys",
      chooseTemplate: "Choose a template",
      description: "Choose a template survey to start",
      createTemplate: "Create a template survey",
      questions: "{count} questions",
      success: "Template survey created successfully",
      error: "An error occurred while creating the template survey",
      updateTemplate: "Update the template survey",
      updateTemplateError:
        "An error occurred while updating the template survey",
      updateTemplateSuccess: "Template survey updated successfully",
      updateTemplateSuccessDescription:
        "The template survey has been updated successfully",
      updateTemplateErrorDescription:
        "An error occurred while updating the template survey",
      deleteTemplate: "Delete the template survey",
      deleteTemplateError:
        "An error occurred while deleting the template survey",
      deleteTemplateSuccess: "Template survey deleted successfully",
      deleteTemplateSuccessDescription:
        "The template survey has been deleted successfully",
      deleteTemplateErrorDescription:
        "An error occurred while deleting the template survey",
      lastUpdate: "Last update",
      status: {
        all: "All templates",
        marketing: "Marketing",
        research: "Research",
      },
      navigation: {
        internal: "Internal base",
        external: "External base",
        owner: "Owner",
        createdAt: "Created at",
        updatedAt: "Updated at",
        actions: "Actions",
      },
      status_template: {
        active: "Active",
        inactive: "Inactive",
        draft: "Draft",
        on_hold: "On hold",
        paused: "Paused",
        cancelled: "Cancelled",
      },
    },
    boards: {
      title: "Dashboards",
      description: "Create a dashboard to visualize your data",
      add: "Create a board",
      name: "Board name",
      layout: {
        welcome: "Welcome to your dashboard",
        empty: "It looks empty over here. Let's get you started!",
        add_chart: "Create a chart",
        title: "Layout",
        description: "Choose the layout of your dashboard",
        preview_text:
          "See how this dashboard looks on different devices. You can edit the layout on each device from here.",
        edit: "Edit",
        save: "Save",
        cancel: "Cancel",
        screen_size: {
          xxxl: "4K",
          xxl: "2K",
          xl: "Large screen",
          lg: "Desktop",
          md: "Laptop",
          sm: "Tablet",
          xs: "Mobile",
        },
      },
    },
    subDashboard: {},
    permissions: {
      title: "Mission Permissions",
      description:
        'Manage who can access "{missionName}". By default, missions are public.',
      success: "Permissions updated successfully",
      save: "Save permissions",
      saving: "Saving...",
      visibility: {
        label: "Visibility",
        public: "Public",
        private: "Private ({count})",
        publicDescription: "Accessible to all members",
        privateDescription: "Restricted access to selected people",
      },
      authorizedUsers: {
        label: "Authorized Users",
        add: "Add",
        empty: {
          title: "No authorized users",
          description: "Add people to give them access",
        },
      },
      search: {
        placeholder: "Search for a person...",
        noResults: "No person found.",
        allAdded: "All users are already added.",
      },
      filters: {
        allRoles: "All roles",
      },
      selection: {
        count: "{count} person(s) selected",
        addAll: "Add all",
        selectAll: "Select all",
        deselectAll: "Deselect all",
      },
      loading: {
        users: "Loading users...",
      },
      publicInfo: {
        title: "Public Mission",
        description: "All organization members can access this mission",
      },
      errors: {
        loadUsers: "Unable to load users",
        update: "Error updating permissions",
      },
    },
  },
  filters: {
    groups: {
      personal_info: {
        label: "Personal Information",
        filters: {
          gender: { label: "Gender" },
          age: { label: "Age" },
          marital_status: { label: "Marital Status" },
          has_children: { label: "Children" },
          nationality: { label: "Nationality" },
        },
      },
      location: {
        label: "Location",
        filters: {
          country: { label: "Country of Residence" },
          city: { label: "City" },
          neighborhood: { label: "Neighborhood" },
          residential_density: { label: "Neighborhood Density" },
          area_type: { label: "Area Type" },
          residence_duration: { label: "Residence Duration" },
        },
      },
      demographics: {
        label: "Demographics",
        filters: {
          education: { label: "Education Level" },
          diploma: { label: "Diploma" },
          languages: { label: "Spoken Languages" },
          religion: { label: "Religion" },
          ethnicity: { label: "Ethnicity" },
        },
      },
      professional: {
        label: "Professional Data",
        filters: {
          sector: { label: "Business Sector" },
          professional_status: { label: "Professional Status" },
          work_time: { label: "Work Time" },
          work_experience: { label: "Work Experience" },
          work_environment: { label: "Work Environment" },
        },
      },
      financial: {
        label: "Financial Data",
        filters: {
          income: { label: "Monthly Income" },
          income_source: { label: "Income Source" },
          bank_account: { label: "Bank Account" },
          mobile_money: { label: "Mobile Money" },
          budget_sufficiency: { label: "Budget Sufficiency" },
        },
      },
      equipment: {
        label: "Equipment and Connectivity",
        filters: {
          phone_type: { label: "Phone Type" },
          has_computer: { label: "Has Computer" },
          internet_connection: { label: "Internet Connection" },
          internet_provider: { label: "Internet Provider" },
          connected_devices: { label: "Connected Devices" },
        },
      },
      consumption: {
        label: "Consumption",
        filters: {
          shopping_frequency: { label: "Grocery Shopping Frequency" },
          shopping_location: { label: "Shopping Location" },
          online_shopping: { label: "Online Shopping" },
          brand_loyalty: { label: "Brand Loyalty" },
          purchase_motivation: { label: "Purchase Motivation" },
        },
      },
      lifestyle: {
        label: "Lifestyle",
        filters: {
          transport_mode: { label: "Transport Mode" },
          housing: { label: "Housing Type" },
          housing_status: { label: "Housing Status" },
          sport: { label: "Sports Practice" },
          travel: { label: "Travel" },
        },
      },
      media: {
        label: "Media and Communication",
        filters: {
          social_media: {
            label: "Social Media",
          },
          social_media_time: {
            label: "Time on Social Media",
          },
          communication_means: {
            label: "Communication Means",
          },
          entertainment: {
            label: "Entertainment",
          },
          streaming: {
            label: "Streaming Platform",
          },
        },
      },
      animals: {
        label: "Pets and Domestic Life",
        filters: {
          pet_types: {
            label: "Types of Pets Owned",
          },
          pet_count: {
            label: "Number of Pets",
          },
          pet_food_location: {
            label: "Feeding Location",
          },
          vet_frequency: {
            label: "Vet Visit Frequency",
          },
          pet_expenses: {
            label: "Main Monthly Expenses",
          },
          pet_specialized_products: {
            label: "Specialized Products Used",
          },
          pet_food_behavior: {
            label: "Feeding Behavior",
          },
          pet_training: {
            label: "Care Training",
          },
          pet_cleanliness: {
            label: "Cleanliness Management",
          },
        },
      },
      social_engagement: {
        label: "Social Engagement",
        filters: {
          volunteering: {
            label: "Volunteering Participation",
          },
          organization_member: {
            label: "Organization Member",
          },
          supported_causes: {
            label: "Supported Causes",
          },
          charity_events: {
            label: "Charity Event Participation",
          },
          regular_donations: {
            label: "Regular Donations",
          },
          volunteering_frequency: {
            label: "Volunteering Frequency",
          },
          fundraising_organization: {
            label: "Fundraising Organization",
          },
          social_impact_consumption: {
            label: "Impact on Consumption",
          },
          social_platforms: {
            label: "Engagement Platforms",
          },
        },
      },
      environment: {
        label: "Environment and Sustainability",
        filters: {
          waste_sorting: {
            label: "Waste Sorting",
          },
          eco_products: {
            label: "Eco-friendly Products",
          },
          green_space: {
            label: "Green Space",
          },
          reusable_products: {
            label: "Reusable Products",
          },
          energy_saving: {
            label: "Energy-saving Equipment",
          },
          sustainable_transport: {
            label: "Sustainable Transport",
          },
          local_food: {
            label: "Local and Seasonal Products",
          },
          composting: {
            label: "Composting",
          },
          public_space_cleaning: {
            label: "Public Space Cleaning",
          },
          packaging_awareness: {
            label: "Packaging Awareness",
          },
        },
      },
      lifestyle_routines: {
        label: "Lifestyle and Routines",
        filters: {
          morning_routine: {
            label: "Morning Routine",
          },
          evening_routine: {
            label: "Evening Routine",
          },
          regular_exercise: {
            label: "Regular Exercise",
          },
          exercise_type: {
            label: "Exercise Type",
          },
          exercise_time: {
            label: "Weekly Exercise Time",
          },
          diet: {
            label: "Diet",
          },
          motivation_source: {
            label: "Motivation Source",
          },
          productivity_habits: {
            label: "Productivity Habits",
          },
          health_tracking: {
            label: "Health Tracking",
          },
          work_life_balance: {
            label: "Work-Life Balance",
          },
        },
      },
      trends_innovation: {
        label: "Trends and Innovation Reactions",
        filters: {
          trends_information: {
            label: "Trend Information Source",
          },
          latest_innovation: {
            label: "Latest Adopted Innovation",
          },
          latest_products: {
            label: "Latest Products Purchase",
          },
          trend_reaction: {
            label: "Reaction to Trends",
          },
          influencer_following: {
            label: "Influencer Following",
          },
          regretted_trend: {
            label: "Regretted Trend",
          },
          innovation_testing: {
            label: "Innovation Testing",
          },
          tech_impact_consumption: {
            label: "Tech Impact on Consumption",
          },
          current_trend_interest: {
            label: "Current Trend Interest",
          },
          innovation_participation: {
            label: "Innovation Project Participation",
          },
        },
      },
    },
  },
} as const;
