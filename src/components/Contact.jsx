import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ message: '', type: '', visible: false });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showStatus = (msg, type) => {
    setStatus({ message: msg, type, visible: true });
    setTimeout(() => {
      setStatus((prev) => ({ ...prev, visible: false }));
    }, 5000);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    if (!validateEmail(email.trim())) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    setSending(true);

    const actionUrl = 'https://formspree.io/f/YOUR_FORM_ID';

    if (!actionUrl || actionUrl.includes('YOUR_FORM_ID')) {
      setTimeout(() => {
        showStatus(
          'Thank you! Message sent successfully (mockup mode). Please configure your Formspree ID to receive real emails!',
          'success'
        );
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSending(false);
      }, 1200);
      return;
    }

    const body = new FormData();
    body.append('name', name);
    body.append('email', email);
    body.append('subject', subject);
    body.append('message', message);

    fetch(actionUrl, {
      method: 'POST',
      body,
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          showStatus('Thank you! Your message has been sent successfully.', 'success');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          response.json().then((data) => {
            if (data && data.errors) {
              showStatus(data.errors.map((err) => err.message).join(', '), 'error');
            } else {
              showStatus('Oops! There was a problem submitting your form.', 'error');
            }
          });
        }
      })
      .catch(() => {
        showStatus('Oops! There was a network issue sending your message.', 'error');
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <h2 className="section-title reveal">Let's <span>Connect</span></h2>
        <p className="section-subtitle reveal">Open to collaborations, freelance work, and full-time opportunities.</p>

        <div className="contact-layout reveal">
          <div className="contact-info">
            <a href="mailto:johnbyju8@gmail.com" className="contact-card" aria-label="Send email to johnbyju8@gmail.com">
              <i className="bx bx-envelope"></i>
              <div>
                <h4>Email</h4>
                <span>johnbyju8@gmail.com</span>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/johnbyju/"
              className="contact-card"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn Profile"
            >
              <i className="bx bxl-linkedin"></i>
              <div>
                <h4>LinkedIn</h4>
                <span>linkedin.com/in/johnbyju</span>
              </div>
            </a>
            <a
              href="https://github.com/johnbyju"
              className="contact-card"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub Profile"
            >
              <i className="bx bxl-github"></i>
              <div>
                <h4>GitHub</h4>
                <span>github.com/johnbyju</span>
              </div>
            </a>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" id="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="form-name">Name</label>
                  <input
                    type="text"
                    id="form-name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-email">Email</label>
                  <input
                    type="email"
                    id="form-email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="form-subject">Subject</label>
                <input
                  type="text"
                  id="form-subject"
                  name="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="form-message">Message</label>
                <textarea
                  id="form-message"
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-submit" id="form-submit-btn" disabled={sending}>
                <span>{sending ? 'Sending...' : 'Send Message'}</span>
                <i className={`bx ${sending ? 'bx-loader-alt bx-spin' : 'bx-send'}`}></i>
              </button>
            </form>
            {status.visible && (
              <div className={`form-status ${status.type}`} id="form-status">
                {status.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
