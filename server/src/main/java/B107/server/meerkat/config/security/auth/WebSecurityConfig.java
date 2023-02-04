package B107.server.meerkat.config.security.auth;

import B107.server.meerkat.config.security.filter.GlobalFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final GlobalFilter globalFilter;

    @Order(0)
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers("/sign");
    }

    @Bean
    public SecurityFilterChain securityConfig(HttpSecurity http) throws Exception {
        http.httpBasic().disable().csrf().disable().formLogin().disable()
                .logout()
                .logoutUrl(globalFilter.getLogoutURL())
                .deleteCookies(globalFilter.getSessionId())
                .addLogoutHandler(globalFilter.logoutHandler())
                .logoutSuccessHandler(globalFilter.logoutSuccessHandler())
                .and()
                .authorizeRequests()
                .antMatchers(globalFilter.getPermitAll()).permitAll()
                .and()
                .addFilter(globalFilter.corsFilter())
                .addFilterBefore(globalFilter.authenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(globalFilter.authorizationFilter(), BasicAuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        return http.build();
    }
}