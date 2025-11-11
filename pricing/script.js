// Reusable pricing card component
class PricingCard {
  constructor(config) {
    this.title = config.title;
    this.price = config.price;
    this.currency = config.currency || '$';
    this.billingPeriod = config.billingPeriod || '/month';
    this.description = config.description || '';
    this.features = config.features || [];
    this.buttonText = config.buttonText || 'Get Started';
    this.featured = config.featured || false;
  }

  render() {
    const card = document.createElement('div');
    card.className = `pricing-card ${this.featured ? 'featured' : ''}`;
    
    card.innerHTML = `
      <h3 class="pricing-card-title">${this.escapeHtml(this.title)}</h3>
      <div class="pricing-card-price">
        ${this.currency}<strong>${this.price}</strong><span>${this.billingPeriod}</span>
      </div>
      ${this.description ? `<p class="pricing-card-description">${this.escapeHtml(this.description)}</p>` : ''}
      <ul class="pricing-features">
        ${this.features.map(f => `<li>${this.escapeHtml(f)}</li>`).join('')}
      </ul>
      <button class="pricing-card-btn" data-plan="${this.escapeHtml(this.title)}">${this.escapeHtml(this.buttonText)}</button>
    `;

    return card;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Pricing data
const pricingPlans = [
  {
    title: 'Basic Plan',
    price: '9.99',
    currency: '$',
    billingPeriod: '/month',
    description: 'Perfect for getting started',
    features: [
      '1 GB Storage',
      'Basic Support',
      'All Core Features',
      'Community Access'
    ],
    buttonText: 'Start Trial',
    featured: false
  },
  {
    title: 'Professional Plan',
    price: '29.99',
    currency: '$',
    billingPeriod: '/month',
    description: 'Best for growing teams',
    features: [
      '100 GB Storage',
      'Priority Support',
      'All Core Features',
      'Advanced Analytics',
      'Team Collaboration',
      'Custom Integrations'
    ],
    buttonText: 'Start Trial',
    featured: true
  },
  {
    title: 'Enterprise Plan',
    price: '99.99',
    currency: '$',
    billingPeriod: '/month',
    description: 'For large-scale operations',
    features: [
      'Unlimited Storage',
      '24/7 Dedicated Support',
      'All Core Features',
      'Advanced Analytics',
      'SSO & Security',
      'Custom Solutions',
      'SLA Guarantee'
    ],
    buttonText: 'Contact Sales',
    featured: false
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const pricingGrid = document.getElementById('pricingGrid');

  // Render all pricing cards
  pricingPlans.forEach(plan => {
    const card = new PricingCard(plan);
    pricingGrid.appendChild(card.render());
  });

  // Add click handlers to all buttons
  document.querySelectorAll('.pricing-card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const planName = e.target.dataset.plan;
      handlePlanSelection(planName, btn.textContent);
    });
  });
});

function handlePlanSelection(planName, buttonText) {
  alert(`You selected: ${planName}\nNext step: ${buttonText}`);
  // Replace with actual purchase flow / navigation
}
