export const metadata = {
  title: 'Refund Policy - Holistic Habits',
  description: 'Learn about our refund policy for Holistic Habits sleep optimization products.',
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-accent mb-6">
          Refund <span className="text-secondary">Policy</span>
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            At Holistic Habits, we stand behind the quality of our products. We want you to be completely satisfied with your purchase. If for any reason you're not, we offer a straightforward refund policy.
          </p>
          
          <h2>30-Day Satisfaction Guarantee</h2>
          <p>
            We offer a 30-day satisfaction guarantee on all our products. If you're not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund of the purchase price (excluding shipping costs).
          </p>
          
          <h2>Refund Process</h2>
          <p>
            To initiate a return and refund, please follow these steps:
          </p>
          
          <ol>
            <li>Contact our customer service team at <a href="mailto:returns@holistichabits.com" className="text-secondary">returns@holistichabits.com</a> or call us at (800) 123-4567.</li>
            <li>Include your order number and reason for return in your communication.</li>
            <li>Our team will provide you with a return authorization and shipping instructions.</li>
            <li>Once we receive the returned item(s), we'll inspect them and process your refund.</li>
            <li>Refunds are typically processed within 5-7 business days and will be issued to the original payment method used for the purchase.</li>
          </ol>
          
          <h2>Return Conditions</h2>
          <p>
            To be eligible for a return and refund, the following conditions must be met:
          </p>
          
          <ul>
            <li>Items must be returned in their original packaging</li>
            <li>Products must be in unused, undamaged condition</li>
            <li>Return must be initiated within 30 days of delivery</li>
            <li>Proof of purchase must be provided</li>
          </ul>
          
          <h2>Exceptions</h2>
          <p>
            Certain items cannot be returned due to health and hygiene reasons, including:
          </p>
          
          <ul>
            <li>Opened packages of NasalBreathe Mouth Tape</li>
            <li>Any product showing signs of use or wear</li>
          </ul>
          
          <h2>Damaged or Defective Items</h2>
          <p>
            If you receive a damaged or defective item, please contact us immediately at <a href="mailto:support@holistichabits.com" className="text-secondary">support@holistichabits.com</a>. We'll replace the item at no cost to you or provide a full refund.
          </p>
          
          <h2>Bundle Returns</h2>
          <p>
            When returning bundle purchases:
          </p>
          
          <ul>
            <li>You may return the entire bundle for a full refund</li>
            <li>For partial bundle returns, the refund will be calculated based on the individual item price, not the discounted bundle price</li>
          </ul>
          
          <h2>Contact Us</h2>
          <p>
            If you have any questions about our refund policy, please contact our customer service team:
          </p>
          
          <ul>
            <li>Email: <a href="mailto:support@holistichabits.com" className="text-secondary">support@holistichabits.com</a></li>
            <li>Phone: (800) 123-4567</li>
            <li>Hours: Monday-Friday, 9am-5pm EST</li>
          </ul>
          
          <p>
            <em>Last updated: January 2024</em>
          </p>
        </div>
      </div>
    </div>
  );
} 